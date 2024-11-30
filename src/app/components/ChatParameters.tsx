import React, { useEffect, useState } from "react";
import { useChatContext } from "../context/chatContext";
import modelData from "../api/data.json";
import { saveConfig, loadConfig } from "@/lib/indexedDB"; // Assuming these functions are in utils/indexedDB

const ChatParameters: React.FC = () => {
  const { state, dispatch } = useChatContext();
  const [maxTokensLimit, setMaxTokensLimit] = useState(4097); // Default max tokens for a fallback model
  const [localConfig, setLocalConfig] = useState({
    model: state.model,
    maxTokens: state.maxTokens,
    temperature: state.temperature,
    topP: state.topP,
    frequencyPenalty: state.frequencyPenalty,
    presencePenalty: state.presencePenalty,
  });

  // Load configuration from IndexedDB
  useEffect(() => {
    const loadInitialConfig = async () => {
      const config = await loadConfig();
      if (config) {
        setLocalConfig(config);
        dispatch({
          type: "SET_ALL_PARAMS",
          payload: config,
        });
      }
    };

    loadInitialConfig();
  }, [dispatch]);

  // Update max tokens limit when the model changes
  useEffect(() => {
    const selectedModel = modelData.find(
      (model) => model.id === localConfig.model
    );
    setMaxTokensLimit(selectedModel ? selectedModel.max_tokens : 4097); // Fallback to a default value
  }, [localConfig.model]);

  const handleInputChange = (field: string, value: any) => {
    setLocalConfig((prevConfig) => ({
      ...prevConfig,
      [field]: value,
    }));
  };

  const handleSaveConfig = async () => {
    try {
      await saveConfig(localConfig);
      dispatch({
        type: `SET_ALL_PARAMS`,
        payload: localConfig,
      });
      console.log("Configuration saved successfully!");
    } catch (error) {
      console.error("Error saving configuration:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Model</label>
        <select
          value={localConfig.model}
          onChange={(e) => handleInputChange("model", e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
        >
          {modelData.map((model) => (
            <option key={model.id} value={model.id}>
              {model.id}
            </option>
          ))}
        </select>
      </div>

      {/* Max Tokens */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Max Tokens: {localConfig.maxTokens}
        </label>
        <input
          type="range"
          min="1"
          max={maxTokensLimit}
          value={localConfig.maxTokens}
          onChange={(e) =>
            handleInputChange("maxTokens", Number(e.target.value))
          }
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>1</span>
          <span>{maxTokensLimit}</span>
        </div>
      </div>

      {/* Other Parameters */}
      {/* Temperature */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Temperature: {localConfig.temperature.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={localConfig.temperature}
          onChange={(e) =>
            handleInputChange("temperature", Number(e.target.value))
          }
          className="w-full"
        />
      </div>

      {/* Top P */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Top P: {localConfig.topP.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={localConfig.topP}
          onChange={(e) => handleInputChange("topP", Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Frequency Penalty */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Frequency Penalty: {localConfig.frequencyPenalty.toFixed(2)}
        </label>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.01"
          value={localConfig.frequencyPenalty}
          onChange={(e) =>
            handleInputChange("frequencyPenalty", Number(e.target.value))
          }
          className="w-full"
        />
      </div>

      {/* Presence Penalty */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Presence Penalty: {localConfig.presencePenalty.toFixed(2)}
        </label>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.01"
          value={localConfig.presencePenalty}
          onChange={(e) =>
            handleInputChange("presencePenalty", Number(e.target.value))
          }
          className="w-full"
        />
      </div>

      {/* Save Button */}
      <div className="mb-4">
        <button
          onClick={handleSaveConfig}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default ChatParameters;
