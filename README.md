# GUI

McLeod seems to think it would be cool to have built our own simulation app. I agree.

## Things we can improve on other simulation apps
- I think that all of the current apps look really nasty. There are a lot of ways to build an interface for inputs, and I don't think that the options have been fully explored. I would love to try and build a screen-based app with very minimalistic interface
    - **Responsive design**: Rasaero does this pretty well, but I think we can improve. Plus, it would be good practice for web design.
        - It turns out wxpython has terrible documentation for responsive design
            - https://www.generacodice.com/en/articolo/4387357/fixing-layout-for-this-listctrl
- **Custom motors**. I don't think that I've seen a custom motor easily accepted into another app.
    - Maybe openRocket allows you to create your own engine files?
    - Anyways, a thing that accepts motor inputs (dimensions and pressure and stuff) would be cool
- More options for simulating

## Options for Software
One of the main issues will probably be how to package the mathematics stuff with the GUI stuff. I don't know if I want to make a separate library that the GUI depends on (this seems like the best way), or to just keep building on top of this project and keep everything together (seems like it will spiral out of control).

I think that ultimately everything will be best-designed if it is a package. [How to Guide](https://packaging.python.org/tutorials/packaging-projects/)

### Requirements (In order of importance)
- Video playing: I think that eventually, it would be really cool to generate a custom video of the rocket flight
- Scrolling: One of the things that bothers me on the other rockets apps is the way that everything is so small. If we could just scroll a little bit it could make the UI much more modern
- Cross platform: It would be pretty nice to have it available online, but I think it should be first developed for desktop.

### Libraries
- tKinter: This is the default choice for GUI. I haven't really liked it when I used it in the past
    - After looking at some more of the code, I really don't like it. pack()? really? https://realpython.com/python-gui-tkinter/
- wxPython: Seems very well supported and has pretty reasonable programming style. https://zetcode.com/wxpython/skeletons/
    - No web support whatsoever 
    - I prefer the .setForegroundColor to tKinter's parameters
    - Not very happy with the concept of responsive design
- flexx: I would really like to learn this one and I already have some experience working with the web-based rendering that it uses. I am slightly concerned about how the calculations would be implemented for this. Meh, I think I don't think I can choose this one due to some issues with development and documentation
    - It has about 75 downloads a day. That is not a lot. wxPython and pyside are both in the thousands
    - I actually really don't like the syntax and it looks like it doesn't really have many parallels with HTML & CSS. https://flexx.readthedocs.io/en/stable/examples/app_layout_src.html#app-layout-py
    - Also it has barely made it out of development and I don't know how much development is being done atm.
- After fiddling around with a lot of python GUIs stuff that is quite simply inferior to web design tools (no responsive design, remarkably obtuse font handling, can't even center stuff), I think that the most sensible root is to build the GUI in not-python, or python that mostly serves up HTMl & CSS stuff
    - I think that Electron may have a reasonable way to run python scripts
        - The way it would probably work is that electron takes the inputs and with NodeJS it saves the files separately
        - Then, when the user presses simulate, the nodeJS app runs a python script, which reads the files, and inputs them into the functions imported from the python library
        - You know what, I want to try this. I think that having this kind of thing be separate
    - I still have some hope that wxpython, pySimple2, or tKinter have a way to serve html
        - This would be simplest, because then the 
- I think Kivy also has some potential for the kind of app I wanted to make, so maybe come back to it


## HTML Libraries
The only issue wit TML & CSS is that html isn't really great for reusing code. I think I can get pug compiling, but it might be difficult in conjunction with electron.

http://www.matthiassommer.it/programming/testing/run-npm-scripts-in-visual-studio-code-with-a-click-of-a-button/?cookie-state-change=1627761221616

## Styling
There are two approaches to styling. Indidualistic styling, where you all of your classes could basically be ids (they only affect one element) and generally styling. Though I think it is frowned on, I'm gonna probably go for more individualistic stuff, since I think most of the components will only need to be used once, and I can reuse stuff based on the template engine


<!-- TODO: I should probably separate the renderer js from the main js -->
