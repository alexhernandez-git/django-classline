import React from 'react'
import styled from '@emotion/styled'
import SearchBar from '../ui/SearchBar';
import { textEllipsis } from '../ui/TextEllipsis';
import { css } from '@emotion/core'

const Categories = props => {
    return (
        <CategoriesContainer className="w-100 border text-center ">
            <CategorieHeader className="p-3">
                {props.title}
            </CategorieHeader>
            <CategorieLink className="p-3 cursor-pointer">
                <small
                    css={textEllipsis}
                    className="ml-2 font-weight-bold"
                >Yoga</small>
            </CategorieLink>
            <CategorieLink className="p-3 cursor-pointer">
                <small
                    css={textEllipsis}
                    className="ml-2 font-weight-bold"
                >Yoga para embarazadas</small>
            </CategorieLink>
            <CategorieLink className="p-3 cursor-pointer">
                <small
                    css={textEllipsis}
                    className="ml-2 font-weight-bold"
                >Meditación</small>
            </CategorieLink>
        </CategoriesContainer>
    )
}

const CategoriesContainer = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 40vh;

`
const CategorieLink = styled.div`
        border-bottom: 1px solid #dee2e6;
        &:last-child{
            border: none;
        }
        background: #fff;

`
const CategorieHeader = styled.div`
        border-bottom: 1px solid #dee2e6;
        &:last-child{
            border: none;
        }
`

export default Categories
