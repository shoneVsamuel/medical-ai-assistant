"""
AI Service Module for Medical Translation and Summarization
Optimized for Gemini 2.5 Flash and OpenAI GPT models.
"""
import os
import logging
from typing import List, Dict, Optional

import openai
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from django.conf import settings

# Configure logging
logger = logging.getLogger(__name__)

class AIProviderError(Exception):
    """Custom exception for AI provider errors"""
    pass

class AIServiceConfig:
    """Configuration manager for AI services"""
    
    @staticmethod
    def get_provider() -> str:
        provider = os.getenv('AI_PROVIDER') or getattr(settings, 'AI_PROVIDER', 'openai')
        return provider.lower().strip()
    
    @staticmethod
    def get_api_key(provider: str) -> str:
        key_name = f"{provider.upper()}_API_KEY"
        api_key = os.getenv(key_name) or getattr(settings, key_name, '')
        if not api_key:
            raise AIProviderError(f"{key_name} is not configured in .env or settings.")
        return api_key.strip()

# --- Gemini Service Implementation ---

class GeminiService:
    """Google Gemini API service wrapper optimized for 2.5 Flash"""
    
    def __init__(self):
        try:
            api_key = AIServiceConfig.get_api_key('gemini')
            genai.configure(api_key=api_key)
            
            # Using the requested 2.5-flash model
            self.model_name = 'gemini-2.5-flash'
            
            # Safety settings are CRITICAL for medical context to prevent "Dangerous Content" blocks
            self.safety_settings = {
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
            }
            
            self.model = genai.GenerativeModel(
                model_name=self.model_name,
                safety_settings=self.safety_settings
            )
            logger.info(f"Gemini {self.model_name} initialized")
        except Exception as e:
            logger.error(f"Gemini Init Error: {e}")
            raise AIProviderError(f"Failed to initialize Gemini: {str(e)}")

    def _call_gemini(self, prompt: str, temp: float = 0.3) -> str:
        try:
            response = self.model.generate_content(
                prompt,
                generation_config={"temperature": temp, "max_output_tokens": 1500}
            )
            
            # Check if the model blocked the response due to safety
            if not response.candidates or response.candidates[0].finish_reason == 3:
                logger.warning("Gemini blocked response due to safety filters.")
                return "Error: Content flagged by safety filters. Please rephrase the medical query."
            
            return response.text.strip()
        except Exception as e:
            logger.error(f"Gemini Execution Error: {e}")
            raise AIProviderError(f"Gemini failed to process request: {str(e)}")

    def translate(self, text: str, target_lang: str) -> str:
        prompt = (
            f"You are a professional medical translator. Translate the following text into {target_lang}. "
            f"Keep all medical terms accurate. Provide ONLY the translation.\n\nText: {text}"
        )
        return self._call_gemini(prompt, temp=0.2)

    def generate_summary(self, messages: List[Dict[str, str]]) -> str:
        conv = "\n".join([f"{m['sender']}: {m['text']}" for m in messages])
        prompt = (
            "Summarize this doctor-patient conversation into a professional medical note with these sections:\n"
            "1. Chief Complaint\n2. Symptoms\n3. Assessment\n4. Treatment Plan\n5. Follow-up\n\n"
            f"Conversation:\n{conv}"
        )
        return self._call_gemini(prompt, temp=0.5)

# --- OpenAI Service Implementation ---

class OpenAIService:
    """OpenAI API service wrapper"""
    
    def __init__(self):
        api_key = AIServiceConfig.get_api_key('openai')
        self.client = openai.OpenAI(api_key=api_key)

    def translate(self, text: str, target_lang: str) -> str:
        response = self.client.chat.completions.create(
            model="gpt-4o-mini", # or "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": f"Translate medical text to {target_lang}. Return ONLY translation."},
                {"role": "user", "content": text}
            ],
            temperature=0.3
        )
        return response.choices[0].message.content.strip()

    def generate_summary(self, messages: List[Dict[str, str]]) -> str:
        conv = "\n".join([f"{m['sender']}: {m['text']}" for m in messages])
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a medical assistant. Summarize the conversation into 5 parts: Complaint, Symptoms, Assessment, Plan, Follow-up."},
                {"role": "user", "content": conv}
            ]
        )
        return response.choices[0].message.content.strip()

# --- Factory Logic ---

def get_service():
    """Returns the configured service instance"""
    provider = AIServiceConfig.get_provider()
    return GeminiService() if provider == 'gemini' else OpenAIService()

def translate_text(text: str, target_language: str) -> str:
    if not text.strip(): return ""
    return get_service().translate(text, target_language)

def generate_summary(messages: List[Dict[str, str]]) -> str:
    if not messages: return "No conversation to summarize."
    return get_service().generate_summary(messages)