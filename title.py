import wx



class Title(wx.Panel):
    def __init__(self, *args, **kw):
        from constants import title_font
        super(Title, self).__init__(*args, **kw)
        print(self.Size)


        # Title Text
        main_text = wx.StaticText(
            self, -1, "Goddard Simulation", (0, 0),
            style=wx.ALIGN_CENTER)

        main_text.SetFont(wx.SWISS_FONT)
        font = main_text.GetFont()
        font.SetWeight(wx.FONTWEIGHT_BOLD)

        main_text.SetFont(title_font)
