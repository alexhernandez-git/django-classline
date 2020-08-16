import React, { useContext, useState } from 'react';
import { AppContext } from "src/context/AppContext"
import { Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import Countries from 'static/data/countries'
import Languages from 'static/data/languages'
import moment from 'moment'
const TeachersProfileInfo = () => {
    const appContext = useContext(AppContext);
    const user_country = Countries.find(country => country.value == appContext.userProfile.user.profile.country)
    const user_language = Languages.find(lang => lang.value == appContext.userProfile.user.profile.language)


    const [info, setInfo] = useState({
        birth_date: moment(appContext.userProfile.user.profile.birth_date).format('YYYY-MM-DD'),
        phone_number: appContext.userProfile.user.phone_number,
        country: user_country != undefined ? user_country : false,
        language: user_language != undefined ? user_language : false,
    })

    const [isEditing, setIsEditing] = useState(false)

    const handleSave = () => {
        appContext.saveProfileInformation(info)
        setIsEditing(false)
    }
    const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };
    return (
        <div className="bg-white shadow p-3 rounded my-4">
            <span className="d-none d-md-block">Información secundaria</span>
            <Form>

                <Row>


                    <Col lg={{ span: 4 }} className="mb-3 text-center d-lg-flex justify-content-end align-items-center">
                        <span className="h5 m-0 font-weight-normal">País</span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                        <Form.Group controlId="formGroupName">
                            <Select
                                styles={selectStyles}

                                value={info.country || ''}
                                options={Countries}
                                placeholder={<div>Paises</div>}
                                onChange={(e) => { setInfo({ ...info, country: e }); setIsEditing(true) }}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        text: 'orangered',
                                        primary25: '#45948930',
                                        primary50: '#45948952',
                                        primary: '#459489',
                                    },
                                })}></Select>
                        </Form.Group>
                    </Col>
                    <Col lg={{ span: 4 }} className="mb-3 text-center d-lg-flex justify-content-end align-items-center">
                        <span className="h5 m-0 font-weight-normal">Idioma</span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                        <Form.Group controlId="formGroupName">
                            <Select
                                styles={selectStyles}
                                value={info.language || ''}
                                options={Languages}
                                getOptionLabel={(option) => option.label + ' / ' + option.nativeName}
                                placeholder={<div>Idiomas</div>}
                                onChange={(e) => { setInfo({ ...info, language: e }); setIsEditing(true) }}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        text: 'orangered',
                                        primary25: '#45948930',
                                        primary50: '#45948952',
                                        primary: '#459489',
                                    },
                                })}></Select>
                        </Form.Group>
                    </Col>
                    <Col lg={{ span: 4 }} className="mb-3 text-center d-lg-flex justify-content-end align-items-center">
                        <span className="h5 m-0 font-weight-normal">Fecha de nacimiento</span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                        <Form.Group controlId="formGroupName">
                            <Form.Control value={info.birth_date} onChange={(e) => { setInfo({ ...info, birth_date: e.target.value }); setIsEditing(true) }} type="date" placeholder="Fecha de nacimiento" />
                        </Form.Group>
                    </Col>
                </Row>

                {/* <Row>

                    <Col lg={{ span: 4 }} className="mb-3text-center d-lg-flex justify-content-end align-items-center">
                        <span className="h5 m-0 font-weight-normal">Pais</span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                        <Select
                            options={Countries}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    text: 'orangered',
                                    primary25: '#45948930',
                                    primary50: '#45948952',
                                    primary: '#459489',
                                },
                            })} />
                    </Col>
                </Row> */}
                <div className="d-flex justify-content-center align-items-center mt-4">
                    {isEditing ?
                        <span className="btn btn-green rounded-pill text-white py-2 px-4" onClick={handleSave}>Guardar</span>
                        :
                        <span className="btn btn-green-disabled rounded-pill text-white py-2 px-4" onClick={handleSave}>Guardar</span>


                    }

                </div>
            </Form>
        </div >
    );
}

export default TeachersProfileInfo;
