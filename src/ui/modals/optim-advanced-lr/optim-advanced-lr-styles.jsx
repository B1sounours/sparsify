/*
Copyright (c) 2021 - present / Neuralmagic, Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { makeStyles } from "@material-ui/core/styles";

export default function makeOptimAdvancedLRStyles() {
  return makeStyles(
    (theme) => {
      return {
        closeButton: {
          position: "absolute",
          right: theme.spacing(1),
          top: theme.spacing(1),
        },
        content: {
          width: "85vw",
          height: "85vh",
          maxWidth: "1280px",
          overflow: "unset",
          padding: 0,
          margin: 0,
        },
        layout: {
          height: `calc(100% - 2 * ${theme.spacing(3)}px)`,
          width: `calc(100% - 2 * ${theme.spacing(3)}px)`,
          padding: theme.spacing(3),
        },
        summary: {
          width: "100%",
          height: `280px`,
          display: "flex",
        },
        modifiers: {
          width: "100%",
          height: `calc(100% - 280px - ${theme.spacing(5)}px)`,
          marginTop: theme.spacing(5),
          display: "flex",
          flexDirection: "column",
        },
        scroller: {
          width: "100%",
          flex: "1 0",
          overflowY: "scroll",
        },
        modifiersList: {
          padding: 0,
        },
      };
    },
    { name: "OptimAdvancedLR" }
  );
}
