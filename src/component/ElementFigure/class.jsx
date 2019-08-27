var jsx;
case (element.figuretype === "image" || element.figuretype === "table" || element.figuretype === "mathImage"):
        var divClass = '', figureClass = '', figLabelClass = '', figTitleClass = '', dataType = '', imageDimension = '', figCaptionClass = '', figCreditClass = '';
        switch (true) {
            case (element.figuretype === "image" && figureAlignment === 'half-text'):
                divClass = 'divImage50Text',
                figureClass = 'figureImage50Text',
                figLabelClass = 'heading4Image50TextNumberLabel',
                    heading4Title = 'heading4Image50TextTitle',
                    dataType = 'image',
                    imageDimension = 'image50Text',
                    figCaptionClass = 'figcaptionImage50Text',
                    figCreditClass = 'paragraphImage50TextCredit';
                break;
                case (element.figuretype === "table" && figureAlignment === 'half-text'):
                        divClass = 'divImage50TextTableImage',
                        figureClass = 'figureImage50TextTableImage',
                        figLabelClass = 'heading4Image50TextTableImageNumberLabel',
                        figTitleClass = 'heading4Image50TextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'image50TextTableImage',
                            figCaptionClass = 'figcaptionImage50TextTableImage',
                            figCreditClass = 'paragraphImage50TextTableImageCredit';
                        break;
                    case (element.figuretype === "mathImage" && figureAlignment === 'half-text'):
                        divClass = 'divImage50TextMathImage',
                        figureClass = 'figureImage50TextMathImage',
                        figLabelClass = 'heading4Image50TextMathImageNumberLabel',
                        figTitleClass = 'heading4Image50TextMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'image50TextMathImage',
                            figCaptionClass = 'figcaptionImage50TextMathImage',
                            figCreditClass = 'paragraphImage50TextMathImageCredit';
                        break;
    
    
                    case (element.figuretype === "image" && figureAlignment === 'text-width'):
                        divClass = 'divImageTextWidth',
                        figureClass = 'figureImageTextWidth',
                        figLabelClass = 'heading4ImageTextWidthNumberLabel',
                        figTitleClass = 'heading4ImageTextWidthTitle',
                            dataType = 'image',
                            imageDimension = 'imageTextWidth',
                            figCaptionClass = 'figcaptionImageTextWidth',
                            figCreditClass = 'paragraphImageTextWidthCredit';
                        break;
                    case (element.figuretype === "table" && figureAlignment === 'text-width'):
                        divClass = 'divImageTextWidthTableImage',
                        figureClass = 'figureImageTextWidthTableImage',
                        figLabelClass = 'heading4ImageTextWidthTableImageNumberLabel',
                        figTitleClass = 'heading4ImageTextWidthTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageTextWidthTableImage',
                            figCaptionClass = 'figcaptionImageTextWidthTableImage',
                            figCreditClass = 'paragraphImageTextWidthTableImageCredit';
                        break;
                    case (element.figuretype === "mathImage" && figureAlignment === 'text-width'):
                        divClass = 'divImageTextWidthMathImage',
                        figureClass = 'figureImageTextWidthMathImage',
                        figLabelClass = 'heading4ImageTextWidthMathImageNumberLabel',
                        figTitleClass = 'heading4ImageTextWidthMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'imageTextWidthMathImage',
                            figCaptionClass = 'figcaptionImageTextWidthMathImage',
                            figCreditClass = 'paragraphImageTextWidthMathImageCredit';
                        break;
    
                    case (element.figuretype === "image" && figureAlignment === 'wider'):
                        divClass = 'divImageWiderThanText',
                        figureClass = 'figureImageWiderThanText',
                        figLabelClass = 'heading4ImageWiderThanTextNumberLabel',
                        figTitleClass = 'heading4ImageWiderThanTextTitle',
                            dataType = 'image',
                            imageDimension = 'imageWiderThanText',
                            figCaptionClass = 'figcaptionImageWiderThanText',
                            figCreditClass = 'paragraphImageWiderThanTextCredit';
                        break;
                    case (element.figuretype === "table" && figureAlignment === 'wider'):
                        divClass = 'divImageWiderThanTextTableImage',
                        figureClass = 'figureImageWiderThanTextTableImage',
                        figLabelClass = 'heading4ImageWiderThanTextTableImageNumberLabel',
                        figTitleClass = 'heading4ImageWiderThanTextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageWiderThanTextTableImage',
                            figCaptionClass = 'figcaptionImageWiderThanTextTableImage',
                            figCreditClass = 'paragraphImageWiderThanTextTableImageCredit';
                        break;
                    case (element.figuretype === "mathImage" && figureAlignment === 'wider'):
                        divClass = 'divImageWiderThanTextMathImage',
                        figureClass = 'figureImageWiderThanTextMathImage',
                        figLabelClass = 'heading4ImageWiderThanTextMathImageNumberLabel',
                        figTitleClass = 'heading4ImageWiderThanTextMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'imageWiderThanTextMathImage',
                            figCaptionClass = 'figcaptionImageWiderThanTextMathImage',
                            figCreditClass = 'paragraphImageWiderThanTextMathImageCredit';
                        break;
    
                    case (element.figuretype === "image" && figureAlignment === 'full'):
                        divClass = 'divImageFullscreenImage',
                        figureClass = 'figureImageFullscreen',
                        figLabelClass = 'heading4ImageFullscreenNumberLabel',
                        figTitleClass = 'heading4ImageFullscreenTitle',
                            dataType = 'image',
                            imageDimension = 'imageFullscreen',
                            figcaptionClass = 'figcaptionImageFullscreen',
                            figCreditClass = 'paragraphImageFullscreen';
                        break;
                    case (element.figuretype === "table" && figureAlignment === 'full'):
                        divClass = 'divImageFullscreenTableImage',
                        figureClass = 'figureImageFullscreenTableImage',
                        figLabelClass = 'heading4ImageFullscreenTableImageNumberLabel',
                        figTitleClass = 'heading4ImageWiderThanTextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageFullscreenTableImage',
                            figCaptionClass = 'figcaptionImageFullscreenTableImage',
                            figCreditClass = 'paragraphImageFullscreenTableImageCredit';
                        break;
                    case (element.figuretype === "mathImage" && figureAlignment === 'full'):
                        divClass = 'divImageFullscreenMathImage',
                        figureClass = 'figureImageFullscreenMathImage',
                        figLabelClass = 'heading4ImageFullscreenMathImageNumberLabel',
                        figTitleClass = 'heading4ImageFullscreenMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'imageFullscreenMathImage',
                            figCaptionClass = 'figcaptionImageFullscreenMathImage',
                            figCreditClass = 'paragraphImageFullscreenMathImageCredit';
                        break;
                        jsx = <div className={divClass} resource="">
                <figure className={figureClass} resource="">
                    <header>
                        <h4 className={figLabelClass + " figureLabel"} ><FroalaReactEditor config={config} model={model.title !== "" ? model.title : ""} placeholderText="Enter Label..." onModelChange={onModelChange} /></h4>
                        <h4 className={figTitleClass + " figureTitle"}><FroalaReactEditor config={config} model={model.subtitle !== "" ? model.subtitle : ""} placeholderText="Enter Title..." onModelChange={onModelChange} /></h4>
                    </header>
                    <div className="pearson-component image figureData" data-uri="" data-type={dataType} data-width="600" data-height="399" onClick={getClickHandler(posterPath)}>
                        <img src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png" data-src={posterPath !== "" ? posterPath : "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"} title="" alt="" className={imageDimension + ' lazyload'} />
                    </div>
                    <figcaption className={figCaptionClass + " figureCaption"} ><FroalaReactEditor config={config} model={model.caption !== "" ? model.caption : ""} placeholderText="Enter caption..." onModelChange={onModelChange} /></figcaption>
                </figure>
                <p className={figCreditClass + " figureCredit"}><FroalaReactEditor config={config} model={model.credit !== "" ? model.credit : ""} placeholderText="Enter credit..." onModelChange={onModelChange} /></p>
            </div>
            case (element.figuretype === "authoredtext"):
                    jsx = <div className="divTextFigure" resource="">
                        <figure className="figureText" resource="">
                            <header>
                                <h4 className="heading4TextNumberLabel figureLabel" ><FroalaReactEditor config={config} model={model.title !== "" ? model.title : ""} placeholderText="Enter Label..." onModelChange={onModelChange} /></h4>
                                <h4 className="heading4TextTitle figureTitle" ><FroalaReactEditor config={config} model={model.subtitle !== "" ? model.subtitle : ""} placeholderText="Enter Title..." onModelChange={onModelChange} /></h4>
                            </header>
                            <p className="paragraphNumeroUno mathml figureData" data-type="mathml" resource=""><FroalaReactEditor config={config} model={model.paraText !== "" ? model.paraText : ""} placeholderText="Type something..." onModelChange={onModelChange} /></p>
                            <figcaption className="figcaptionText figureCaption" ><FroalaReactEditor config={config} model={model.caption !== "" ? model.caption : ""} placeholderText="Enter caption..." style={{ fontSize: "10.8px", fontWeight: "normal" }} onModelChange={onModelChange} /></figcaption>
                        </figure>
                        <p className="paragraphTextCredit figureCredit"><FroalaReactEditor config={config} model={model.credit !== "" ? model.credit : ""} placeholderText="Enter credit..." onModelChange={onModelChange} /></p>
                    </div>
                    break;
                
                case (element.figuretype === "codelisting"):
                jsx = <div className="divCodeSnippetFigure" id="blockCodeFigure" >
                        <figure className="figureCodeSnippet" >
                            <header>
                                <h4 className="heading4CodeSnippetNumberLabel" ><FroalaReactEditor  config={config} model={model.title !== "" ? model.title : ""} placeholderText="Enter Label..." onModelChange={onModelChange} /></h4>
                                <h4 className="heading4CodeSnippetTitle" ><FroalaReactEditor  config={config} model={model.subtitle !== "" ? model.subtitle : ""} placeholderText="Enter Title..." onModelChange={onModelChange} /></h4>
                            </header>
                            <div className="pearson-component blockcode codeSnippet" data-type="codeSnippet" data-startNumber={codelistingStartnumber} data-programLanguage={codelistingLang}>
                            <pre className = "code-listing" ><code id = "codeListing"><FroalaReactEditor contextBC={context} config={config} model={ model!== "" && model.paraText !== "" ? model.paraText : ""} placeholderText="Enter the Block Code…" onModelChange={onModelChange} /></code></pre>
                            </div>
                            <figcaption  className="figcaptionCodeSnippet" ><FroalaReactEditor config={config} model={model.caption !== "" ? model.caption : ""} placeholderText="Enter caption..." style={{ fontSize: "10.8px", fontWeight: "normal" }} onModelChange={onModelChange} /></figcaption>
                        </figure>
                        <p className="paragraphCodeSnippetCredit"><FroalaReactEditor config={config} model={model.credit !== "" ? model.credit : ""} placeholderText="Enter credit..." onModelChange={onModelChange} /></p>
                    </div>
                    break;