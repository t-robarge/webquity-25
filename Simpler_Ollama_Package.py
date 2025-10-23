import ollama


print("To stop prompting, type 'quit'") 


# Inititalize the Ollama Clent
client = ollama.Client()

# Define the model and run input
model = "llama3.1"

while True:
    # get user prompt
    user_prompt = input("Ask anything: ")
    # break loop
    if(user_prompt == 'quit'):
        break
    else:
        # Send the Query to the model
        response = client.generate(model=model, prompt=user_prompt)

        # Print the response form the model
        print("response from Ollama: ")
        print(response.response)

print("done! :)")