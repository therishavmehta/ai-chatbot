import React, { useEffect, useState } from "react";
import { useChatContext } from "../context/chat-context";
import modelData from "../api/data.json";
import { saveConfig, loadConfig } from "@/lib/indexedDB"; // Assuming these functions are in utils/indexedDB
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import ThemedToast from "./ui/toast";
import {
  IFCChatActionType,
  IFCChatParameterKeys,
  IFCChatParameters,
} from "@/types/message";

interface IFCParam {
  key: IFCChatParameterKeys;
  label: string;
  param: IFCChatActionType;
  min: number;
  max: number;
  step: number;
}

const params: IFCParam[] = [
  {
    key: IFCChatParameterKeys.temperature,
    label: "Temperature",
    param: IFCChatActionType.SET_TEMPERATURE,
    min: 0,
    max: 2,
    step: 0.01,
  },
  {
    key: IFCChatParameterKeys.maxTokens,
    label: "Max Tokens",
    param: IFCChatActionType.SET_MAX_TOKENS,
    min: 1,
    max: 4096,
    step: 1,
  },
  {
    key: IFCChatParameterKeys.topP,
    param: IFCChatActionType.SET_TOP_P,
    label: "Top P",
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    key: IFCChatParameterKeys.frequencyPenalty,
    label: "Frequency Penalty",
    param: IFCChatActionType.SET_FREQUENCY_PENALTY,
    min: -2,
    max: 2,
    step: 0.01,
  },
  {
    key: IFCChatParameterKeys.presencePenalty,
    label: "Presence Penalty",
    param: IFCChatActionType.SET_PRESENCE_PENALTY,
    min: -2,
    max: 2,
    step: 0.01,
  },
];

const ChatParameters: React.FC = () => {
  const { state, dispatch } = useChatContext();
  const [localConfig, setLocalConfig] = useState<IFCChatParameters>({
    apiKey: state.apiKey,
    model: state.model,
    maxTokens: state.maxTokens,
    temperature: state.temperature,
    topP: state.topP,
    frequencyPenalty: state.frequencyPenalty,
    presencePenalty: state.presencePenalty,
  });
  const [initialConfig, setInitialConfig] =
    useState<Partial<IFCChatParameters>>(localConfig); // Store initial config for comparison
  const [openToast, setOpenToast] = useState({
    title: "",
    description: "",
    open: false,
  });


  // Load configuration from IndexedDB
  useEffect(() => {
    const loadInitialConfig = async () => {
      const config: IFCChatParameters | undefined = await loadConfig();
      if (config) {
        setLocalConfig(config);
        setInitialConfig(config); // Set the initial config when it's loaded
        dispatch({
          type: IFCChatActionType.SET_ALL_PARAMS,
          payload: config,
        });
      }
    };

    loadInitialConfig();
  }, [dispatch]);

  const handleInputChange = (field: IFCChatParameterKeys, value: number) => {
    setLocalConfig((prevConfig) => ({
      ...prevConfig,
      [field]: value,
    }));
  };

  const handleSaveConfig = async () => {
    try {
      // Add API key to the config before saving
      await saveConfig(localConfig); // Save the configuration in IndexedDB
      dispatch({
        type: IFCChatActionType.SET_ALL_PARAMS,
        payload: localConfig, // Update chatContext
      });
      setOpenToast({
        title: "Successful",
        description: "Configuration saved successfully!",
        open: true,
      });
    } catch (error) {
      console.error("Error saving configuration:", error);
      setOpenToast({
        title: "Error",
        description: "Configuration not saved!",
        open: true,
      });
    }
  };

  // Disable save button if localConfig is the same as initialConfig or API key is missing
  const isConfigDirty =
    JSON.stringify(localConfig) !== JSON.stringify(initialConfig);

  return (
    <div className="space-y-6 h-full">
      {/* Model Selection */}
      <div className="mb-4">
        <Label className="block text-sm font-medium mb-2 text-foreground-secondary">
          Select Model
        </Label>
        <Select
          value={localConfig.model}
          onValueChange={(value) => {
            setLocalConfig((prevConfig) => ({
              ...prevConfig,
              model: value,
            }));
            dispatch({ type: IFCChatActionType.SET_MODEL, payload: value });
          }}
        >
          <SelectTrigger className="text-foreground-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background-secondary text-foreground-primary max-h-80">
            {modelData.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* API Key Input Box */}
      <div className="mb-4">
        <Label className="block text-sm font-medium mb-2 text-foreground-secondary">
          Enter API Key
        </Label>
        <input
          type="text"
          value={localConfig.apiKey}
          onChange={(e) =>
            setLocalConfig((prev) => ({ ...prev, apiKey: e.target.value }))
          }
          className="w-full bg-background-secondary border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your API key"
        />
      </div>

      {/* Parameter Sliders */}
      {params.map((item, idx) => {
        return (
          <div key={idx} className="mb-4">
            <Label className="block text-sm font-medium mb-2 text-foreground-secondary">
              {item.label}: {localConfig[item.key]}
            </Label>
            <Slider
              defaultValue={[localConfig[item.key]]}
              min={item.min}
              max={item.max}
              step={item.step}
              value={[localConfig[item.key]]}
              onValueChange={(value: number[]) =>
                handleInputChange(item.key, value[0])
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-foreground-tertiary mt-1">
              <span>{item.min}</span>
              <span>{item.max}</span>
            </div>
          </div>
        );
      })}

      {/* Save Button */}
      <div className="mb-4">
        <Button
          onClick={handleSaveConfig}
          variant={"default"}
          size="lg"
          className="w-full"
          disabled={!isConfigDirty} // Disable if config is not dirty or API key is missing
        >
          Save Configuration
        </Button>
      </div>

      <ThemedToast {...openToast} setOpen={setOpenToast} />
    </div>
  );
};

export default ChatParameters;
