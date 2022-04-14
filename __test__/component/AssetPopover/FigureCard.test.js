import React from 'react';
import { mount } from 'enzyme';
import FigureCard from '../../../src/component/AssetPopover/FigureCard';

describe('Testing FigureCard Component', () => {
    let props = {
        selectedFigure: jest.fn(),
        forInputKey: 0,
        figureDetails: {
            versionUrn: "urn:pearson:work:d0c5f826-334b-45fb-aa95-8f2da36a8276",
            entityUrn: "urn:pearson:entity:a8c082ea-1519-46dc-a0d7-07eb52922771",
            parentContainerEntityUrn: "urn:pearson:entity:2a3a61a1-5467-4bc9-8248-b63951cf78c6",
            type: "figure",
            subType: "imageTextWidth",
            figureType: "image",
            title: "Figure 1.2",
            captions: {
                text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
            subTile: null,
            path: "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            imageId: "",
            numberedandlabel: true,
            displayedlabel: "Figure"
        },
        title: "Figure 1.2",
        caption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        path: "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
    }
    describe('Test Rendering of FigureCard', () => {
        let wrapper = mount(<FigureCard {...props} />)
        it('Have 1 input element ', () => {
            expect(wrapper.find('input')).toHaveLength(1);
        })
        it('onchange clicked', () => {
            let event = {}
            wrapper.find('input').simulate('change', event);
            const onSearchMock = jest.fn();
            expect(onSearchMock).toHaveBeenCalledTimes(0)
        })
    });
    describe("Testing Rendering of Title & Caption", () => {
        it("Renders Title & Caption both", () => {
            let wrapper = mount(<FigureCard {...props} />)
            expect(wrapper.find('input')).toHaveLength(1);
            const title = wrapper.find('.modalText').map((node) => node.text());
            expect(title[0]).toBe(props.title)
            const caption = wrapper.find('.modalCaption').map((node) => node.text());
            const renderedCaption = `Caption: ${props.caption}`
            expect(caption[0]).toBe(renderedCaption)
        })
        it("Renders only Title", () => {
            let props2 = { ...props }
            props2["caption"] = '';
            props2["figureDetails"]["captions"]["text"] = null;
            let wrapper = mount(<FigureCard {...props2} />)
            expect(wrapper.find('input')).toHaveLength(1);
            const title = wrapper.find('.modalText').map((node) => node.text());
            expect(title[0]).toBe(props2.title)
            const caption = wrapper.find('.modalCaption')
            expect(caption).toHaveLength(0)
        })
        it("Renders only Caption", () => {
            let props3 = { ...props }
            props3["title"] = '';
            props3["figureDetails"]["title"] = null;
            let wrapper = mount(<FigureCard {...props3} />)
            expect(wrapper.find('input')).toHaveLength(1);
            const title = wrapper.find('.modalText')
            expect(title).toHaveLength(0)
            const caption = wrapper.find('.modalCaption').map((node) => node.text());
            const renderedCaption = `Caption: ${props3.caption}`
            expect(caption[0]).toBe(renderedCaption)
        })
    });
})