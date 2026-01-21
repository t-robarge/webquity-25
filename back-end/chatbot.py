from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)  # allows React app (different port) to call this API

# Initialize the Ollama client once
client = ollama.Client()

MODEL_NAME = "llama3.1"


@app.route("/api/chat", methods=["POST"])
def chat():
    """
    Expects JSON: { "message": "..." }
    Returns JSON: { "reply": "..." }
    """
    data = request.get_json(silent=True) or {}
    user_message = (data.get("message") or "").strip()

    if not user_message:
        return jsonify({"error": "Field 'message' is required."}), 400

    try:
        # Call the local Ollama model
        response = client.generate(model=MODEL_NAME, prompt=user_message)

        # Depending on ollama-py version, response may be an object or dict
        if isinstance(response, dict):
            reply_text = response.get("response", "")
        else:
            # matches your original example: response.response
            reply_text = getattr(response, "response", "")

        if not reply_text:
            reply_text = "Sorry, I couldn't generate a response."

        return jsonify({"reply": reply_text})

    except Exception as e:
        # Log server-side, return generic error to client
        print("Ollama error:", e)
        return jsonify({"error": "Error communicating with the model."}), 500


if __name__ == "__main__":
    # Run on 0.0.0.0 so your front-end can hit it from another host/port
    app.run(host="0.0.0.0", port=5001, debug=True)
# To run: python3 back-end/chatbot.py