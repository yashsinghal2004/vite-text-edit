# React + TypeScript + Vite

-This file contains "components" folder in which movable text functionality and editing text functionality is built as per given tasks in the video by Celebrare Founder with undo-redo feature in texteditor file only using typescript in react app

-App.tsx renders only the TextEditor file as in TextEditor.tsx MovableText.tsx is loaded following a condition if you are not editing the text 

-main file is index.tsx which renders App.tsx

-How I Built this Project(Logic):
1)Used useState hook of react for changing the states like changing texts,styles and keeping a track by making a history useState hook which save the changes by making historyindex state hook which tracks current index in history for undo and redo functionality.
2)Used important map function of js for rendering array of fonts
3)Used js event listeners for handling mouse events and making text move 
4)For making text move on mobile by simply dragging- Built touch functions which keeps track of then touch started and after after when touch is done using some mathematical operations
5)Written basic css in index.css file for the buttons and tags
