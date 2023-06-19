"use client";

import { useState } from "react";
import * as C from "./styles";
import { BsFillPencilFill } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TransformationForm } from "@/components";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <C.PageContainer>
      <C.PageContent>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth={true}
          maxWidth={"lg"}
        >
          <DialogTitle>Create new transformation</DialogTitle>
          <DialogContent>
            <TransformationForm />
          </DialogContent>
        </Dialog>

        <C.Title>Df-Analyzer</C.Title>
        <C.MainContainer>
          <C.Header>
            <C.TitleLabel>DataFlow Tag</C.TitleLabel>
            <C.DataflowTagInput />
          </C.Header>

          <C.Main>
            <C.Section>
              <C.TitleLabel>Code Input</C.TitleLabel>
              <C.CodeInput placeholder="Paste your code here..." />
            </C.Section>

            <C.VerticalSeparator />

            <C.Section>
              <C.TitleLabel>Transformations</C.TitleLabel>
              <C.TransformationsList>
                <C.TransformationPlaceholder>
                  <BsFillPencilFill size={20} />
                  Transformation 1
                </C.TransformationPlaceholder>
                <C.TransformationPlaceholder>
                  <BsFillPencilFill size={20} />
                  Transformation 2
                </C.TransformationPlaceholder>
                <C.TransformationPlaceholder>
                  <BsFillPencilFill size={20} />
                  Transformation 3
                </C.TransformationPlaceholder>

                <C.AddTransformationButton onClick={() => setOpen(true)}>
                  +
                </C.AddTransformationButton>
              </C.TransformationsList>
            </C.Section>
          </C.Main>

          <C.Footer>
            <C.LoadButton>LOAD</C.LoadButton>
          </C.Footer>
        </C.MainContainer>
      </C.PageContent>
    </C.PageContainer>
  );
}
