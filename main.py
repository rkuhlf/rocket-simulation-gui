import wx
from title import Title


# Holds the logic for which screen should be displayed
# I think that in the end it will probably be just a string variable in this main object, but I'm not sure how easy that would be to set from multiple windows inside
class Main(wx.Frame):
    def __init__(self, parent, title):
        super(Main, self).__init__(parent, title=title)
        self.Maximize(True)

        title = Title(self)



    # def InitUI(self):
        # I believe that the first argument is the parent
        # panel = wx.Panel(self)

        # panel.SetBackgroundColor(background)
        # vbox = wx.BoxSizer(wx.VERTICAL)

        # midPan = wx.Panel(panel)




def main():

    app = wx.App()
    from constants import title_font, background


    main = Main(None, "Goddard Simulation")
    main.Show()

    app.MainLoop()



if __name__ == '__main__':
    main()
