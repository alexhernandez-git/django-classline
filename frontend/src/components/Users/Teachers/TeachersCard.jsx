import React, { Component, useState } from 'react';
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import { Link } from "react-router-dom"

import "static/assets/styles/components/Users/Teachers/TeachersCard.scss"

import Punctuation from "src/components/Layout/Punctuation"
function TeachersCard() {
    const [color, setColor] = useState(['primary', 'secondary', 'success', 'warning', 'danger', 'info'])

    const randColor = color.sort(() => Math.random() - 0.5)

    return (
        <>
            <div className="container-card">
                <Link to="/teacher/1">
                    <div className="div-card-slick pt-2 pb-4 pr-2 pl-2">
                        <Card className="card-slick w-100 position-relative cursor-pointer shadow border-0 overflow-hidden">

                            <Card.Img className="rounded-circle img-card mt-2" variant="top" src={`https://source.unsplash.com/random/1`} />
                            <Card.Body className="p-2 text-center">
                                <Card.Title>Alex Hernandez</Card.Title>
                                <Card.Text
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                    className="text-dark text-sm text-break">
                                    <small>Experto en backend: PHP, node.js, django, docker</small>
                                </Card.Text>
                                <div className="d-flex justify-content-end">

                                    <Punctuation />
                                    <div className="ml-1">
                                        <Badge variant="primary" className="text-dark border bg-light">
                                            +500
                        </Badge>
                                    </div>
                                </div>
                            </Card.Body>

                        </Card>
                    </div >
                </Link>
            </div>
        </>
    );

}

export default TeachersCard;