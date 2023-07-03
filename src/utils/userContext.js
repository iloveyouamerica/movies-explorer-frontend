// контекст, как глобальные переменные, доступные для всех компонентов
import React from "react";

export const UserContext = React.createContext();

export const userData = {
  userId: 11,
  userName: 'Агент Малдер',
  userEmail: 'agent@mulder.xfiles',
  loggedIn: false,
};
