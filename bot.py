import discord
import os # default module
import io
from selenium import webdriver
from selenium.webdriver.common.by import By
from PIL import Image
from dotenv import load_dotenv
import asyncio
import time

load_dotenv() # load all the variables from the env file
bot = discord.Bot()

@bot.event
async def on_ready():
    print(f"{bot.user} is ready and online!")

@bot.slash_command(name="hello", description="Say hello to the bot")
async def hello(ctx: discord.ApplicationContext):
    await ctx.respond("Hey!")

@bot.slash_command(name="imagetest", description="Test image sending")
async def imagetest(ctx: discord.ApplicationContext):

    await ctx.response.defer()

    # Configure Chrome options for headless mode
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--force-device-scale-factor=1")

    driver = webdriver.Chrome(options=chrome_options)
    driver.set_window_size(1200, 800)
    try:
        driver.get("https://properpickle.github.io/WhatNext/")
        time.sleep(1)
        canvas_element = driver.find_element(By.ID, "myCanvas")
        screenshot_bytes = canvas_element.screenshot_as_png
        image_buffer = io.BytesIO(screenshot_bytes)
        image_buffer.seek(0)
        #await asyncio.sleep(1)  # Simulate a delay (optional, just for testing)
        await ctx.followup.send(file=discord.File(image_buffer, 'cool_image.png'))
    except Exception as e:
        await ctx.followup.send(f"Error: {str(e)}")
    finally:
        driver.quit()

bot.run(os.getenv('TOKEN')) # run the bot with the token