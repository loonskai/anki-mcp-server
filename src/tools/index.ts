import { Tool } from "./tool.js";

import cardTools from "./card.js";
import deckTools from "./deck.js";
import graphicalTools from "./graphical.js";
import miscellaneousTools from "./miscellaneous.js";
import modelTools from "./model.js";
import noteTools from "./note.js";
import statisticTools from "./statistic.js";

export const tools: Tool<any>[] = [
  ...cardTools,
  ...deckTools,
  ...graphicalTools,
  ...miscellaneousTools,
  ...modelTools,
  ...noteTools,
  ...statisticTools,
];
