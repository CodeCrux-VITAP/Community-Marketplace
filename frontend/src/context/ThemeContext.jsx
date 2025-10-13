import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext= createContext();

export const ThemeProvider= ({children})=>{
  const [darkMode, setDarkMode]= useState(false)

  useEffect(()=>{
    const savedTheme= localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(savedTheme === "true")
  }, [])

  const toggleTheme= ()=>{
    setDarkMode(prev=>{
      localStorage.setItem('darkMode', !prev);
      return !prev
    })
  }

  return (
    <ThemeContext.Provider value= {{darkMode, toggleTheme}} > {children} </ThemeContext.Provider >
  )
}