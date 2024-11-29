"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useChatContext, ChatAction } from "../context/chatContext";

export function SidebarControls() {
  const { state, dispatch } = useChatContext();

  const handleSliderChange = (key: ChatAction, value: number) => {
    dispatch({ type: key, payload: value });
  };

  return (
    <div className="flex h-full flex-col gap-6 border-l border-border-default bg-background-secondary p-4">
      <div className="space-y-4">
        {/* Model Selection */}
        <div className="space-y-2">
          <label className="text-sm text-foreground-primary">Model</label>
          <Select
            defaultValue={state.model}
            onValueChange={(value) =>
              dispatch({ type: "SET_MODEL", payload: value })
            }
          >
            <SelectTrigger className="text-foreground-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background-secondary text-foreground-primary">
              <SelectItem value="gpt-4o">gpt-4o</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Response Format Selection */}
        <div className="space-y-2">
          <label className="text-sm text-foreground-primary">
            Response Format
          </label>
          <Select
            defaultValue={state.responseFormat.type}
            onValueChange={(value) =>
              dispatch({
                type: "SET_RESPONSE_FORMAT",
                payload: { type: "text" },
              })
            }
          >
            <SelectTrigger className="text-foreground-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background-secondary text-foreground-primary">
              <SelectItem value="text">Text</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Model Configuration */}
      <div className="space-y-6">
        <h3 className="text-sm text-foreground-primary">Model Configuration</h3>
        <div className="space-y-4">
          {[
            {
              key: "temperature",
              label: "Temperature",
              param: "SET_TEMPERATURE",
              min: 0,
              max: 2,
              step: 0.01,
            },
            {
              key: "maxTokens",
              label: "Max Tokens",
              param: "SET_MAX_TOKENS",
              min: 1,
              max: 4096,
              step: 1,
            },
            {
              key: "topP",
              param: "SET_TOP_P",
              label: "Top P",
              min: 0,
              max: 1,
              step: 0.01,
            },
            {
              key: "frequencyPenalty",
              label: "Frequency Penalty",
              param: "SET_FREQUENCY_PENALTY",
              min: -2,
              max: 2,
              step: 0.01,
            },
            {
              key: "presencePenalty",
              label: "Presence Penalty",
              param: "SET_PRESENCE_PENALTY",
              min: -2,
              max: 2,
              step: 0.01,
            },
          ].map((item) => (
            <div key={item.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-foreground-primary">
                  {item.label}
                </label>
                <input
                  type="number"
                  value={state[item.key]}
                  onChange={(e) =>
                    handleSliderChange(item.param, Number(e.target.value))
                  }
                  min={item.min}
                  max={item.max}
                  step={item.step}
                  className="w-16 bg-gray-800 border border-gray-700 rounded-lg text-right px-2 text-sm text-foreground-primary"
                />
              </div>
              <Slider
                defaultValue={[state[item.key]]}
                min={item.min}
                max={item.max}
                step={item.step}
                onValueChange={(value) =>
                  handleSliderChange(item.param, value[0])
                }
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <Button
        className="mt-auto text-foreground-primary border-foreground-primary"
        variant="outline"
        onClick={() => console.log("Saved Configuration:", state)}
      >
        Save as Preset
      </Button>
    </div>
  );
}
