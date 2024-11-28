// components/ChatParameters.tsx
import React from "react";
import { useChatContext } from "../context/chatContext";

const ChatParameters: React.FC = () => {
  const { state, dispatch } = useChatContext();

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Model Configuration</h2>

      {/* Temperature */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Temperature: {state.temperature.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={state.temperature}
          onChange={(e) =>
            dispatch({
              type: "SET_TEMPERATURE",
              payload: Number(e.target.value),
            })
          }
          className="w-full"
        />
      </div>

      {/* Max Tokens */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Max Tokens: {state.maxTokens}
        </label>
        <input
          type="number"
          value={state.maxTokens}
          onChange={(e) =>
            dispatch({
              type: "SET_MAX_TOKENS",
              payload: Number(e.target.value),
            })
          }
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
        />
      </div>

      {/* Top P */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Top P: {state.topP.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={state.topP}
          onChange={(e) =>
            dispatch({ type: "SET_TOP_P", payload: Number(e.target.value) })
          }
          className="w-full"
        />
      </div>

      {/* Frequency Penalty */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Frequency Penalty: {state.frequencyPenalty.toFixed(2)}
        </label>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.01"
          value={state.frequencyPenalty}
          onChange={(e) =>
            dispatch({
              type: "SET_FREQUENCY_PENALTY",
              payload: Number(e.target.value),
            })
          }
          className="w-full"
        />
      </div>

      {/* Presence Penalty */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Presence Penalty: {state.presencePenalty.toFixed(2)}
        </label>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.01"
          value={state.presencePenalty}
          onChange={(e) =>
            dispatch({
              type: "SET_PRESENCE_PENALTY",
              payload: Number(e.target.value),
            })
          }
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ChatParameters;
