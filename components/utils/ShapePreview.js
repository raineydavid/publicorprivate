import React, { useState, useEffect } from "react";

// Styled Component
import styled from "styled-components";

// Bootstrap
import Form from "react-bootstrap/Form";

// Draggablevertice Component
import { DraggableVertice } from "..";

// shapecalculation functions
import { calculateHeightWidthValue } from "../../utils/shape-calculations";

const Playground = styled.div`
  width: 100%;
`;

const Box = styled.div`
    width: ${props => props.width || '100px'};
    height: ${props => props.height || '100px'};
    margin: 0 auto;
    position: relative;
`;

const Shadow = styled.div`
    background-color: ${props => props.backgroundColor || '#00c4ff'};
    opacity: 0.25;
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
`;

const Component = styled.div`
    clip-path: ${props => props.formula};
    background-color: ${props => props.backgroundColor || '#00c4ff'};
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
`;

const ShapePreview = (props) => {

    // Holds an array of DraggableVertices
    const [vertices, setVertices] = useState([]);

    const [heightCoordinate, setHeightCoordinate] = useState(); 

    const [widthCoordinate, setWidthCoordinate] = useState();

    // Set to a number that determines which DraggableVertice has its tooltip showing
    // This way, only one vertice can show its close button at a time
    const [focusNumber, setFocusNumber] = useState(-1);

    // Creation of DraggableVertices depending on shapeInformation values
    useEffect(() => {
        const array = []; 
        setWidthCoordinate();
        setHeightCoordinate();
    
        for (let i = 0; i < props.shapeInformation.verticeCoordinates.length; i++) {

            if (props.shapeInformation.verticeCoordinates[i] === undefined) {
                return;
            }

          array.push(
            <DraggableVertice 
                key={1000 + i}
                number = {i}
                x={props.shapeInformation.verticeCoordinates[i].x}
                y={props.shapeInformation.verticeCoordinates[i].y}
                handleChange={props.handleChange}
                focusNumber={focusNumber}
                setFocusNumber={setFocusNumber}
                clipPathType={props.shapeInformation.clipPathType}
            />
          );
        }
        setVertices(array);

        if (props.shapeInformation.verticeCoordinates.length > 0) {
            if (props.shapeInformation.clipPathType === "circle" || props.shapeInformation.clipPathType === "ellipse") {

                let x = calculateHeightWidthValue(props.shapeInformation.verticeCoordinates[0].x, props.shapeInformation.width);
    
                setWidthCoordinate(
                    <DraggableVertice 
                        number = {1}
                        type="width"
                        x={x}
                        y={props.shapeInformation.verticeCoordinates[0].y}
                        handleChange={props.handleChange}
                        focusNumber={focusNumber}
                        setFocusNumber={setFocusNumber}
                        clipPathType={props.shapeInformation.clipPathType}
                    />
                );
            }
    
            if (props.shapeInformation.clipPathType === "ellipse") {
    
                let y = calculateHeightWidthValue(props.shapeInformation.verticeCoordinates[0].y, props.shapeInformation.height);
    
                setHeightCoordinate(
                    <DraggableVertice 
                        number = {2}
                        type="height"
                        x={props.shapeInformation.verticeCoordinates[0].x}
                        y={y}
                        handleChange={props.handleChange}
                        focusNumber={focusNumber}
                        setFocusNumber={setFocusNumber}
                        clipPathType={props.shapeInformation.clipPathType}
                    />
                );
    
            }
        }

      }, [props.shapeInformation, focusNumber]);

    return(
        <>
            <Playground>
                <Box height="300px" width="300px" onClick={(e) => props.handleChange(e)}>
                    { props.shapeInformation.showShadow && <Shadow backgroundColor={props.shapeInformation.backgroundColor} id="shapeShadow" /> }
                    <Component formula={props.shapeInformation.formula} backgroundColor={props.shapeInformation.backgroundColor} id="clippedShape" />
                    {vertices}
                    {widthCoordinate}
                    {heightCoordinate}
                </Box>

                <Form style={{padding: '7px', textAlign: 'center'}}>
                    <Form.Check
                        type="switch"
                        name="showShadow"
                        id="modal-custom-switch"
                        label="Show Outside of the Clipped Area"
                        checked={props.shapeInformation.showShadow}
                        onChange={(e) => props.handleChange(e)}
                    />
                </Form>
            </Playground>
        </>
    );
}

export default ShapePreview;