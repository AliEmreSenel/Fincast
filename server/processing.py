# !pip install accelerate bitsandbytes
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from prediction import prediction

STOCK = 'AAPL'
START_DATE = '2024-04-12'
END_DATE = '2024-04-19'

model_id = "meta-llama/Meta-Llama-3-8B-Instruct"

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.bfloat16,
    load_in_4bit=True
)

answer = prediction(STOCK, START_DATE, END_DATE)

def change_prediction(answer):
    messages = [
        {"role": "system", "content": """You retrieve requested data from text input. Given the following detailed Forecast about the stock Apple, extract the stock prediction in the form of (UP/DOWN - PERCENT). ONLY output the words in the following format (UP/DOWN - PERCENTAGE) where PERCENTAGE is a single number. If the text only provides "slight increase" or "slight decrease" without a PERCENTAGE, use 1% as default. Do not leave PERCENTAGE empty."""},
        {"role": "user", "content": f"{answer}"
        }
    ]

    input_ids = tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        return_tensors="pt"
    ).to(model.device)

    terminators = [
        tokenizer.eos_token_id,
        tokenizer.convert_tokens_to_ids("<|eot_id|>")
    ]

    outputs = model.generate(
        input_ids,
        max_new_tokens=256,
        eos_token_id=terminators,
        do_sample=True,
        temperature=0.6,
        top_p=0.9,
    )
    change = tokenizer.decode(outputs[0][input_ids.shape[-1]:], skip_special_tokens=True)
    return change # DOWN - 2%

def generate_questions(answer):
    messages = [
    {"role": "system", "content": """Given the input text, create 3 possible technical questions about financial indicators cited in the text. The questions must NOT be about the stock analysed. The questions must purely be financial knowledge. Output should be in the following form: 
    1. Question1
    2. Question2
    3. Question3"""},
    {"role": "user", "content": f"{answer}"
    }
    ]

    input_ids = tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        return_tensors="pt"
    ).to(model.device)

    terminators = [
        tokenizer.eos_token_id,
        tokenizer.convert_tokens_to_ids("<|eot_id|>")
    ]

    outputs = model.generate(
        input_ids,
        max_new_tokens=256,
        eos_token_id=terminators,
        do_sample=True,
        temperature=0.6,
        top_p=0.9,
    )
    questions = tokenizer.decode(outputs[0][input_ids.shape[-1]:], skip_special_tokens=True)
    return questions # 1. What is the implication of a high P/E ratio in the stock market, and how can it be used to gauge investor sentiment?
                     # 2. How do dividend yields and P/E ratios typically interact, and what can their relationship indicate about a company's financial performance?
                     # 3. What is the significance of a decreasing stock price trend, and how can it be used to identify potential market instability or investor sentiment shifts?


def generate_answers(answer):
    questions = generate_questions(answer)
    messages = [
    {"role": "system", "content": """You are an Economics Professor specialised in Finance. Given the input text, give 3 complete answers to the three questions you are presented with. Give full, detailed answers with a professional tone citing financial knowledge. Output should be in the following form: 
    1. Answer1
    2. Answer2
    3. Answer3"""},
    {"role": "user", "content": f"{questions}"
    }
    ]

    input_ids = tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        return_tensors="pt"
    ).to(model.device)

    terminators = [
        tokenizer.eos_token_id,
        tokenizer.convert_tokens_to_ids("<|eot_id|>")
    ]

    outputs = model.generate(
        input_ids,
        max_new_tokens=1000,
        eos_token_id=terminators,
        do_sample=True,
        temperature=0.6,
        top_p=0.9,
    )
    answers = tokenizer.decode(outputs[0][input_ids.shape[-1]:], skip_special_tokens=True)
    return answers  # 1. The implication of a high P/E ratio in the stock market is that investors are willing to pay a premium for a company's shares, indicating high expectations for future growth and profitability. A high P/E ratio can be used to gauge investor sentiment in several ways:

                    # * It reflects the market's optimism about a company's prospects, as investors are willing to pay a higher multiple of earnings for a company with high growth potential.
                    # * It can be used to identify overvalued or undervalued stocks, as a high P/E ratio may indicate that a stock is overbought and due for a correction.
                    # * It can be used to compare the market's expectations for a company to its actual performance, as a high P/E ratio may indicate that a company's earnings are not meeting market expectations.

                    # According to the dividend discount model (DDM), a high P/E ratio can also be interpreted as a reflection of investors' expectations for future dividend payments. If investors expect a company to generate high returns in the future, they may be willing to pay a higher P/E ratio, as they anticipate higher dividends in the future.

                    # Source: Fama, E. F., & French, K. R. (2002). The equity premium puzzle. Journal of Financial Economics, 63(3), 301-326.

                    # 2. Dividend yields and P/E ratios typically interact in the following ways:

                    # * High dividend yields are often accompanied by low P/E ratios, as investors may be attracted to the income generated by the dividend payments, but may not expect significant future growth.
                    # * Low dividend yields are often accompanied by high P/E ratios, as investors may be willing to pay a premium for a company's shares, anticipating high future growth and profitability.
                    # * A company with a high P/E ratio and low dividend yield may indicate that investors are more focused on growth prospects than current income generation.

                    # The relationship between dividend yields and P/E ratios can indicate several things about a company's financial performance:

                    # * High dividend yields and low P/E ratios may indicate that a company is a value stock, with a strong history of dividend payments and a low valuation.
                    # * Low dividend yields and high P/E ratios may indicate that a company is a growth stock, with high expectations for future growth and profitability.

                    # Source: Damodaran, A. (2012). Investment Valuation. John Wiley & Sons.

                    # 3. A decreasing stock price trend can be used to identify potential market instability or investor sentiment shifts in several ways:

                    # * A decreasing stock price trend may indicate that investors are becoming less confident in a company's prospects, as they adjust their expectations for future growth and profitability.
                    # * A decreasing stock price trend may also indicate that investors are becoming more risk-averse, as they seek safer investments with lower volatility.
                    # * A decreasing stock price trend can also be a sign of a broader market shift, as investors adjust their portfolios in response to changes in interest rates, economic indicators, or other market factors.

                    # Investors can use a decreasing stock price trend to identify potential market instability or sentiment shifts by:

                    # * Monitoring changes in investor sentiment and market conditions, such as changes in market volatility or investor confidence.
                    # * Analyzing company-specific factors, such as changes in earnings expectations, dividend payments, or management changes.
                    # * Considering broader market trends, such as changes in interest rates, economic indicators, or other market factors.

                    # Source: Shiller, R. J. (2014). Irrational Exuberance. Princeton University Press.

change = change_prediction(answer)
questions = generate_questions(answer)
answers = generate_answers(answer)
