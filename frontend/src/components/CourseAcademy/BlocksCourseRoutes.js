import styled from '@emotion/styled';
import update from "immutability-helper";
import React, {useCallback, useState} from 'react'
import Switch from 'react-bootstrap/esm/Switch';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route } from 'react-router-dom';
import PlaylistForm from '../AdminAcademy/PlaylistForm';
import { ButtonCustom } from '../ui/ButtonCustom';
import BlockCard from './BlockCard';
import BlocksItems from './BlockItems';
import BlocksCourse from './BlocksCourse';

const BlocksCourseRoutes = () => {
  
    return (
      <DndProvider backend={HTML5Backend}>
    
      <Switch>
  
            <Route
              exact
              path="/academy/:program/admin/course/:course"
              component={BlocksCourse}
            />
            <Route
              exact
              path="/academy/:program/admin/course/:course/block/:block"
              component={BlocksItems}
            />
            
      </Switch>
      </DndProvider>

    )
}
export const GridBlocks = styled.div`
  display: grid;
  grid-gap: 4rem 2rem;

  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default BlocksCourseRoutes
