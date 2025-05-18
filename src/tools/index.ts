import { Tool } from "./tool.js";

import deckTools from "./deck.js";
import modelTools from "./model.js";
import noteTools from "./note.js";

export const tools: Tool<any>[] = [...deckTools, ...modelTools, ...noteTools];
