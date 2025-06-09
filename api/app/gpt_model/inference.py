import openai
from langchain.prompts.chat import (
    HumanMessagePromptTemplate,
    ChatPromptTemplate,
)
from pydantic import BaseModel, Field
from langchain.output_parsers import PydanticOutputParser

class WellBeingAnalysis(BaseModel):
    sentiment: str = Field(description="Sentiment of provided input")
    summary: str = Field(description="Summary of the input")
    feeling: int = Field(description="Value 1-10 on the users mood based on the input")


def run_prediction(file_path):
    with open(file_path, "r") as f:
        contents = f.read()

        prompt_template = """You are a helpful assistant. Your task is to determine the sentiment of a given text. The sentiment can be either positive, negative, or neutral. 
        Furthermore, you shall give me a value between 1-10 based on the tone of the prompt you receive. A 1 is horrible, meaning the user is really depressed, a 10 is the best a human can feel.
        You shall also provide a very brief summary of the text in Swedish. 
        The output should be:
        Sentiment: <sentiment>
        Summary: <summary>
        Feeling: <feeling>

        Here is the text:
        {input}

        {format_instructions}
        """
        parser = PydanticOutputParser(pydantic_object=WellBeingAnalysis)
        # Build prompt from a template
        message = HumanMessagePromptTemplate.from_template(prompt_template)
        chat_prompt = ChatPromptTemplate.from_messages([message])

        # Fill the placeholder in the prompt
        chat_prompt_with_input = chat_prompt.format_prompt(input=contents, format_instructions=parser.get_format_instructions())

        # Initialize the OpenAI client
        client = openai.OpenAI(
            base_url="https://api.llm7.io/v1",
            api_key="unused"
        )
        

        # Send the message and get the response
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # You may need to specify the model
            messages=chat_prompt_with_input.to_messages()
        )
        data = parser.parse(response.choices[0].message.content)
        return data