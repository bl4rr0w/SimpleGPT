from flask import Flask, request, jsonify, render_template
import openai

app = Flask(__name__)

# Initialize the GPT-3.5 API key
openai.api_key = "YOUR_GPT_3_5_API_KEY"


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_response", methods=["POST"])
def get_response():
    data = request.get_json()
    user_message = data["message"]

    # Use the GPT-3.5 API to generate the bot's response
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=user_message,
            max_tokens=150  # Adjust the length of the response as needed
        )

        bot_response = response['choices'][0]['text'].strip()

        return jsonify({"message": bot_response})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"message": "Oops! Something went wrong. Please try again later."})

if __name__ == "__main__":
    app.run(debug=True)
