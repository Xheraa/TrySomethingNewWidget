const api_url = "https://telepathics.herokuapp.com/"

const url = api_url + "/db/ideas/random"

const req = new Request(url)
const res = await req.loadJSON()

const pathAvatar = "https://telepathics.github.io/spontaneity-generator/assets/favicons/apple-icon-120x120.png"
const pathAvatar_i = await new Request(pathAvatar)
const pathAvatarImg = await pathAvatar_i.loadImage()

let widgetSize = "big"
let context = new DrawContext()
switch(config.widgetFamily) {
  case "small":
    context.size = new Size(360, 360)
    widgetSize = "small"
    break;
  case "medium":
    context.size = new Size(720, 360)
    widgetSize = "big"
    break;
  case "large":
    context.size = new Size(720, 720)
    widgetSize = "big"
    break;
  default:
    context.size = new Size(720, 360)
    widgetSize = "big"
    break;
}
context.opaque = false
let widget = createWidget()
widget.backgroundImage = context.getImage()
const refreshMinutes = 1440
let now = new Date()
let later = new Date(now.getTime() + refreshMinutes * 60000)
widget.refreshAfterDate = later

await widget.presentLarge()

Script.setWidget(widget)
Script.complete()

function createWidget() {
  let w = new ListWidget()
  w.backgroundColor = new Color("#DED4CA", 1)

  let headerStack = w.addStack()
  headerStack.centerAlignContent()
  headerStack.url = url
  if(widgetSize == "small")
    headerStack.addSpacer(null)
  let image = headerStack.addImage(pathAvatarImg)
  if(widgetSize == "small") {
    image.imageSize = new Size(50, 50)
    image.cornerRadius = 25
    headerStack.addSpacer(null)
  } else {
    image.imageSize = new Size(30, 30)
    image.cornerRadius = 15
    headerStack.addSpacer(6)
  }

  let titleElement = null
  if(widgetSize == "small") {
    titleElement = w.addText("Try something new!")
    titleElement.centerAlignText()
    titleElement.font = Font.boldRoundedSystemFont(10)
  } else {
    titleElement = headerStack.addText("Try something new!")
  }
  titleElement.textColor = Color.black()
  titleElement.textOpacity = 1.0
  titleElement.font = Font.boldRoundedSystemFont(12)

  if(widgetSize == "big") {
    let ideaElement = headerStack.addText("")
    ideaElement.textColor = Color.black()
    ideaElement.textOpacity = 0.7
    ideaElement.font = Font.mediumRoundedSystemFont(18)
  }

  w.addSpacer(10)

  let ideaStack = w.addStack()
  if(widgetSize == "small")
  ideaStack.addSpacer(null)
  ideaStack.centerAlignContent()
  let IdeaElement = ideaStack.addText((res.idea))
  IdeaElement.textColor = Color.black()
  IdeaElement.font = Font.mediumRoundedSystemFont(18)

  return w
}
