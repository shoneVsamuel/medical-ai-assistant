"""
Test script to check available Gemini models.
Run this to see which models your API key supports.
"""
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    print("❌ GEMINI_API_KEY not found in .env file")
    exit(1)

print(f"✅ API Key found: {api_key[:10]}...")
print("\n🔍 Checking available models...\n")

try:
    genai.configure(api_key=api_key)
    
    # List all available models
    print("Available models that support generateContent:")
    print("-" * 50)
    
    available_models = []
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            available_models.append(model.name)
            print(f"✅ {model.name}")
    
    if not available_models:
        print("❌ No models found that support generateContent")
    else:
        print(f"\n✅ Found {len(available_models)} model(s)")
        print(f"\n💡 Try using: {available_models[0]}")
        
        # Test the first available model
        print(f"\n🧪 Testing model: {available_models[0]}")
        try:
            model = genai.GenerativeModel(available_models[0])
            response = model.generate_content("Hello")
            print(f"✅ Model works! Response: {response.text[:50]}...")
        except Exception as e:
            print(f"❌ Model test failed: {e}")

except Exception as e:
    print(f"❌ Error: {e}")
    print("\n💡 Make sure your GEMINI_API_KEY is correct and from Google AI Studio")



