import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateMCQ = (
  meaning: {
    Text: string;
  }[],
  id: number
): string[] => {
  const corectAns: string = meaning[id].Text;

  const restAns = meaning.filter((i) => i.Text !== meaning[id].Text);

  const incorrectAns: string[] = _.sampleSize(restAns, 3).map((i) => i.Text);

  const mcq = _.shuffle([...incorrectAns, corectAns]);

  return mcq;
};

export const translateWords = async (la: langType) => {
  try {
    const words = generate(8).map((w) => ({
      Text: w,
    }));
    const rapidkey = import.meta.env.VITE_RAPID_API;
    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": la,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": rapidkey,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );
    const recieved: TranslationType[] = response.data;

    const arr: WordType[] = recieved.map((w, i) => {
      const options: string[] = generateMCQ(words, i);
      return {
        word: w.translations[0].text,
        meaning: words[i].Text,
        options,
      };
    });

    return arr;
  } catch (error) {
    return error;
  }
};

export const hearAudio = async (
  text: string,
  language: langType
): Promise<string> => {
  const key = import.meta.env.VITE_TEXT_TO_SPEECH_API;
  const rapidkey = import.meta.env.VITE_RAPID_API;

  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64:"true"
  });
  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "hi") encodedParams.set("hl", "hi-in");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "ar-eg");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: { key },

      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": rapidkey,
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );

  return data;
};
