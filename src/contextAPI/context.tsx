import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Types
type Theme = 'light' | 'dark';

interface CharacterContextType {
  //allText: string;
  //allTextArray: string[];
  wordCount: number; 
  characterCount: number;
  sentenceCount: number;
  theme: Theme;
  letterDensity: string[];
  toggleTheme: () => void;
  textSplitter: (text: string) => void;
}

// Create Context
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

const CharacterContextProvider=({children}:{ children: ReactNode })=> {
  const [theme, setTheme] = useState<Theme>('dark');
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [letterDensity, setLetterDensity] = useState<string[]>([]);
  
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const textSplitter =(text: string)=>{
    const words = text.split(/\s+/).filter(Boolean);
    console.log(words);
    const sentences = text.split('. ');
    const spaces = false;
    let characters =[];
    if (!spaces){
      characters = text.split('').filter((a)=>a!=" ");
    } else{
      characters = text.split('');
    }
    console.log(characters)
    
    setCharacterCount((characters.length - 1) < 0? 0 : characters.length);
    if(characters.length==0){
      setWordCount(0);
      setSentenceCount(0)
    }else{
      setWordCount((words.length - 1) < 0? 0 : words.length);
      setSentenceCount((sentences.length - 1) < 0? 0 : sentences.length);
    }
    setLetterDensity(words);
}


  return (
    <CharacterContext.Provider value={{
      //allText,
      //allTextArray,
      wordCount,
      characterCount,
      sentenceCount,
      theme,
      letterDensity,
      toggleTheme,
      textSplitter
    }}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterContext;

export const useGlobalContext =()=>{
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within an ExtensionProvider');
  }
  return context;
}

export {CharacterContextProvider}