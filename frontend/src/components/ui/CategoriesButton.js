import React from 'react'
import styled from '@emotion/styled'

const CategoriesButton = () => {
    return (
        <DropdownButton className="d-none d-sm-block">
            <ul>
                <li>
                    <a>Categorias</a>
                    <div className="sub-menu-1">
                        <ul>
                            <li className="hover-me">
                                <a>Videos</a>
                                <div className="sub-menu-2">
                                    <ul>
                                        <li><a>Yoga</a></li>
                                        <li><a>Yoga waefe</a></li>
                                        <li><a>fewaa waefe</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="hover-me">
                                <a>Podcasts</a>
                                <div className="sub-menu-2">
                                    <ul>
                                        <li><a>Yoga</a></li>
                                        <li><a>Yoga waefe</a></li>
                                        <li><a>fewaa waefe</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>

                    </div>
                </li>
            </ul>
        </DropdownButton>

    )
}

const DropdownButton = styled.nav`
          text-align: center;
          z-index: 999;
          a{
              cursor:pointer;
          }
          ul{
            display: inline-flex;
            list-style:none;
            margin: 0;
          }
       
          ul li a{
            text-decoration: none;
          }
          .menu-bar ul li:hover{
            background: #2bab0d;
            border-radius: 3px;
          }
          .sub-menu-1{
                background: #fff;
                display: none;
            }
            ul li:hover .sub-menu-1{
                display: block;
                position:absolute;
            }
            ul li:hover .sub-menu-1 ul{
                display:block;
            }
            ul li:hover .sub-menu-1 ul li{
                width: 150px;
                padding: 10px;
                background: transparent;
                border-radius: 0;
                text-align: left;
            }
            ul li:hover .sub-menu-1 ul li:last-child{
            border-bottom: none;
            }
            ul li:hover .sub-menu-1 ul li a:hover{
                color: #ccc;
            }
            .sub-menu-2{
                display: none;
                background: #fff;

            }
            .hover-me:hover .sub-menu-2{
                position: absolute;
                display:block;
                margin-top: -40px;
                margin-left: 140px;
            }
`

// float: left;

// margin: 0;
// li{
//     float: left;
//     position: relative;
//     list-style: none;
// }
// li span{
//     display: block;
// }
// ul{
//     display: none;
// }
// li:hover > ul{
//     display:block;
// }
// ul li ul{
//     top: 0;
//     left: 100px;
//     position:absolute;
// }
// span{
//     display: block;
// }
export default CategoriesButton
