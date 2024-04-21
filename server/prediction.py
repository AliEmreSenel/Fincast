# !pip install torch==2.0.1 transformers==4.32.0 peft==0.5.0 pandas yfinance finnhub-python nvidia-ml-py3
import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
# from google.colab import userdata
# userdata.get('HF_TOKEN')
import re
from prompt_building import build_prompt_from_df

STOCK = 'AAPL'
START_DATE = '2024-04-12'
END_DATE = '2024-04-19'

def predition(STOCK, START_DATE, END_DATE):
    base_model = AutoModelForCausalLM.from_pretrained(
        'meta-llama/Llama-2-7b-chat-hf',
        trust_remote_code=True,
        device_map="auto",
        torch_dtype=torch.float16,   
    )
    base_model.model_parellal = True

    model = PeftModel.from_pretrained(base_model, 'FinGPT/fingpt-forecaster_dow30_llama2-7b_lora')
    model = model.eval()

    tokenizer = AutoTokenizer.from_pretrained('meta-llama/Llama-2-7b-chat-hf')
    tokenizer.padding_side = "right"
    tokenizer.pad_token_id = tokenizer.eos_token_id

    prompt = build_prompt_from_df(STOCK, START_DATE, END_DATE)
    inputs = tokenizer(
        prompt, return_tensors='pt'
    )
    inputs = {key: value.to(model.device) for key, value in inputs.items()}
            
    res = model.generate(
        **inputs, max_length=4096, do_sample=True,
        eos_token_id=tokenizer.eos_token_id,
        use_cache=True
    )
    output = tokenizer.decode(res[0], skip_special_tokens=True)
    answer = re.sub(r'.*\[/INST\]\s*', '', output, flags=re.DOTALL) ###  
    return answer   #[Positive Developments]:
                    # 1. Apple has successfully cut its greenhouse gas emissions by 55% since 2015, indicating a strong commitment to sustainability and environmental responsibility.
                    # 2. The company's new product, Vision Pro, has the potential to revolutionize the business world by providing an innovative and immersive enterprise experience.
                    # 3. Apple's Environmental Progress Report has highlighted the company's achievements and commitment to becoming carbon neutral.

                    # [Potential Concerns]:
                    # 1. Apple's stock price has been steadily decreasing over the past few weeks, indicating potential market instability.
                    # 2. The company's P/E ratio is relatively high, which could indicate that investors are becoming more cautious about investing in the stock.
                    # 3. The dividend yield is relatively low, which could indicate that the company's financial performance may not be as strong as expected.

                    # [Prediction & Analysis]:
                    # Based on the above analysis, I predict that Apple's stock price will decrease by around 2-3% in the upcoming week. While the company has shown strong commitment to sustainability and innovation, there are some potential concerns that may impact the stock price in the short term. The recent decrease in stock price and high P/E ratio are significant concerns, as they could indicate potential market instability and caution among investors. However, the company's commitment to sustainability and innovation could potentially drive long-term growth and stability. Therefore, while the short-term outlook may be somewhat negative, the long-term outlook for Apple remains positive.

if __name__ == '__main__':
    print(predition(STOCK, START_DATE, END_DATE))