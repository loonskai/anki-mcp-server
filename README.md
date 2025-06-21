# Anki MCP Server

## Requirements

1. Node.js 18 or newer. [Download Node.js](https://nodejs.org/en/download)
2. Anki desktop application. [Download Anki](https://apps.ankiweb.net/)
3. Anki-Connect plugin. [Install Anki-Connect](https://git.sr.ht/~foosoft/anki-connect/tree/ab4d964d96712788889eb35d79471966aaf17ef6/item/README.md#installation)

You need to have Anki desktop application up and running to use Anki MCP server.

## MCP Installation

```json
{
  "mcpServers": {
    "anki": {
      "command": "npx",
      "args": [
        "@loonskai/anki-mcp-server@latest"
      ]
    }
  }
}
```

## Progress Log

- [x] Run with NPM
- [ ] Run with Docker
- [ ] Tools configuration
- [ ] Add tests

### Tools

- [ ] card.answerCards
- [ ] card.areDue
- [ ] card.areSuspended
- [ ] card.cardsInfo
- [ ] card.cardsModTime
- [ ] card.cardsToNotes
- [ ] card.findCards
- [ ] card.forgetCards
- [ ] card.getEaseFactors
- [ ] card.getIntervals
- [ ] card.relearnCards
- [ ] card.setDueDate
- [ ] card.setEaseFactors
- [ ] card.setSpecificValueOfCard
- [ ] card.suspend
- [ ] card.suspended
- [ ] card.unsuspend
- [ ] deck.changeDeck
- [ ] deck.cloneDeckConfigId
- [ ] deck.createDeck
- [x] deck.deckNames
- [ ] deck.deckNamesAndIds
- [ ] deck.deleteDecks
- [ ] deck.getDeckConfig
- [ ] deck.getDeckStats
- [ ] deck.getDecks
- [ ] deck.removeDeckConfigId
- [ ] deck.saveDeckConfig
- [ ] deck.setDeckConfigId
- [ ] graphical.guiAddCards
- [ ] graphical.guiAnswerCard
- [ ] graphical.guiBrowse
- [ ] graphical.guiCheckDatabase
- [ ] graphical.guiCurrentCard
- [ ] graphical.guiDeckBrowser
- [ ] graphical.guiDeckOverview
- [ ] graphical.guiDeckReview
- [ ] graphical.guiEditNote
- [ ] graphical.guiExitAnki
- [ ] graphical.guiImportFile
- [ ] graphical.guiSelectCard
- [ ] graphical.guiSelectNote
- [ ] graphical.guiSelectedNotes
- [ ] graphical.guiShowAnswer
- [ ] graphical.guiShowQuestion
- [ ] graphical.guiStartCardTimer
- [ ] graphical.guiUndo
- [ ] media.deleteMediaFile
- [ ] media.getMediaDirPath
- [ ] media.getMediaFilesNames
- [ ] media.retrieveMediaFile
- [ ] media.storeMediaFile
- [ ] miscellaneous.apiReflect
- [ ] miscellaneous.exportPackage
- [ ] miscellaneous.getActiveProfile
- [ ] miscellaneous.getProfiles
- [ ] miscellaneous.importPackage
- [ ] miscellaneous.loadProfile
- [ ] miscellaneous.multi
- [ ] miscellaneous.reloadCollection
- [ ] miscellaneous.requestPermission
- [ ] miscellaneous.sync
- [ ] miscellaneous.version
- [ ] model.createModel
- [ ] model.findAndReplaceInModels
- [ ] model.findModelsById
- [x] model.findModelsByName
- [ ] model.modelFieldAdd
- [ ] model.modelFieldDescriptions
- [ ] model.modelFieldFonts
- [ ] model.modelFieldNames
- [ ] model.modelFieldRemove
- [ ] model.modelFieldRename
- [ ] model.modelFieldReposition
- [ ] model.modelFieldSetDescription
- [ ] model.modelFieldSetFont
- [ ] model.modelFieldSetFontSize
- [ ] model.modelFieldsOnTemplates
- [x] model.modelNames
- [ ] model.modelNamesAndIds
- [ ] model.modelStyling
- [ ] model.modelTemplateAdd
- [ ] model.modelTemplateRemove
- [ ] model.modelTemplateRename
- [ ] model.modelTemplateReposition
- [ ] model.modelTemplates
- [ ] model.updateModelStyling
- [ ] model.updateModelTemplates
- [x] note.addNote
- [ ] note.addNotes
- [ ] note.addTags
- [ ] note.canAddNotes
- [ ] note.canAddNotesWithErrorDetail
- [ ] note.clearUnusedTags
- [ ] note.deleteNotes
- [ ] note.findNotes
- [ ] note.getNoteTags
- [ ] note.getTags
- [ ] note.notesInfo
- [ ] note.notesModTime
- [ ] note.removeEmptyNotes
- [ ] note.removeTags
- [ ] note.replaceTags
- [ ] note.replaceTagsInAllNotes
- [ ] note.updateNote
- [ ] note.updateNoteFields
- [ ] note.updateNoteModel
- [ ] note.updateNoteTags
- [ ] statistic.cardReviews
- [ ] statistic.getCollectionStatsHTML
- [ ] statistic.getLatestReviewID
- [ ] statistic.getNumCardsReviewedByDay
- [ ] statistic.getNumCardsReviewedToday
- [ ] statistic.getReviewsOfCards
- [ ] statistic.insertReviews
