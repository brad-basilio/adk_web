import React, { useEffect, useRef, useState } from "react";
import BaseAdminto from "@Adminto/Base";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import Swal from "sweetalert2";

import Modal from "../Components/Adminto/Modal";
import Table from "../Components/Adminto/Table";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";
import DxButton from "../Components/dx/DxButton";
import CreateReactScript from "../Utils/CreateReactScript";
import ReactAppend from "../Utils/ReactAppend";
import StaffRest from "../actions/Admin/StaffRest";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaSnapchat,
  FaPinterest,
  FaReddit,
  FaEnvelope
} from 'react-icons/fa';

const staffRest = new StaffRest();

// Redes sociales predefinidas
const predefinedSocials = [
  { id: 'facebook', name: 'Facebook', icon: FaFacebook },
  { id: 'instagram', name: 'Instagram', icon: FaInstagram },
  { id: 'twitter', name: 'Twitter/X', icon: FaTwitter },
  { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin },
  { id: 'youtube', name: 'YouTube', icon: FaYoutube },
  { id: 'tiktok', name: 'TikTok', icon: FaTiktok },
  { id: 'whatsapp', name: 'WhatsApp', icon: FaWhatsapp },
  { id: 'telegram', name: 'Telegram', icon: FaTelegram },
  { id: 'discord', name: 'Discord', icon: FaDiscord },
  { id: 'snapchat', name: 'Snapchat', icon: FaSnapchat },
  { id: 'pinterest', name: 'Pinterest', icon: FaPinterest },
  { id: 'reddit', name: 'Reddit', icon: FaReddit },
  { id: 'email', name: 'Email', icon: FaEnvelope }
];

const Staff = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Refs para campos del formulario
    const idRef = useRef();
    const nameRef = useRef();
    const jobRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const isLoadingDataRef = useRef(false);

    const [characteristics, setCharacteristics] = useState([{ value: "" }]);
    const [socials, setSocials] = useState([]);
    const [socialRefs, setSocialRefs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [shouldUpdateSelects, setShouldUpdateSelects] = useState(false);

    // useEffect para establecer los valores de los selects cuando cambian los socials
    useEffect(() => {
        if (shouldUpdateSelects && socials.length > 0) {
            isLoadingDataRef.current = true;
            setTimeout(() => {
                socials.forEach((social, index) => {
                    if (socialRefs[index]?.current && social.social) {
                        const $select = $(socialRefs[index].current);
                        $select.val(social.social).trigger('change');
                    }
                });
                setShouldUpdateSelects(false);
                // Esperar un poco más antes de desactivar isLoadingDataRef
                setTimeout(() => {
                    isLoadingDataRef.current = false;
                }, 100);
            }, 300);
        }
    }, [shouldUpdateSelects, socials, socialRefs]);

    // Manejo de características
    const addCharacteristic = () => {
        setCharacteristics([...characteristics, { value: "" }]);
    };

    const updateCharacteristic = (index, value) => {
        const newCharacteristics = [...characteristics];
        newCharacteristics[index].value = value;
        setCharacteristics(newCharacteristics);
    };

    const removeCharacteristic = (index) => {
        if (characteristics.length <= 1) return;
        const newCharacteristics = characteristics.filter(
            (_, i) => i !== index
        );
        setCharacteristics(newCharacteristics);
    };
    // Manejo de redes sociales
    const addSocial = () => {
        setSocials([...socials, { social: "", link: "" }]);
        setSocialRefs([...socialRefs, React.createRef()]);
    };
    const updateSocialType = (index, value) => {
        console.log('updateSocialType llamado:', index, value, 'isLoadingDataRef:', isLoadingDataRef.current);
        console.log('Estado actual de socials:', socials);
        if (isLoadingDataRef.current) {
            console.log('Ignorando onChange porque estamos cargando datos');
            return;
        }
        const newSocials = [...socials];
        console.log('Antes de actualizar:', newSocials[index]);
        newSocials[index].social = value;
        console.log('Después de actualizar:', newSocials[index]);
        setSocials(newSocials);
    };
    const updateSocialLink = (index, value) => {
        const newSocials = [...socials];
        newSocials[index].link = value;
        setSocials(newSocials);
    };
    const removeSocial = (index) => {
        const newSocials = socials.filter((_, i) => i !== index);
        const newRefs = socialRefs.filter((_, i) => i !== index);
        setSocials(newSocials);
        setSocialRefs(newRefs);
    };

    // Cargar datos al editar
    const onModalOpen = (data) => {
        setIsEditing(!!data?.id);

        // Resetear formulario
        idRef.current.value = data?.id || "";
        nameRef.current.value = data?.name || "";
        jobRef.current.value = data?.job || "";
        descriptionRef.current.value = data?.description || "";
        imageRef.current.value = null;
        if (data?.image) {
            imageRef.image.src = `/api/staff/media/${data.image}`;
        }

        // Cargar características existentes
        if (data?.characteristics && data.characteristics.length > 0) {
            setCharacteristics(
                data.characteristics.map((item) => ({ value: item }))
            );
        } else {
            setCharacteristics([{ value: "" }]);
        }
        // Cargar redes sociales existentes
        if (data?.socials && data.socials.length > 0) {
            console.log('Datos de socials desde DB:', data.socials);
            const loadedSocials = data.socials.map((item) => ({
                social: item.social || "",
                link: item.link || ""
            }));
            console.log('Socials procesados:', loadedSocials);
            const newRefs = loadedSocials.map(() => React.createRef());
            setSocials(loadedSocials);
            setSocialRefs(newRefs);
            // Activar el flag para que el useEffect actualice los selects
            setShouldUpdateSelects(true);
        } else {
            setSocials([]);
            setSocialRefs([]);
            setShouldUpdateSelects(false);
        }

        $(modalRef.current).modal("show");
    };

    // Enviar formulario
    const onModalSubmit = async (e) => {
        e.preventDefault();

        console.log('=== SUBMIT - Estado actual de socials:', socials);

        const formData = new FormData();
        formData.append("name", nameRef.current.value);
        formData.append("job", jobRef.current.value);
        formData.append("description", descriptionRef.current.value);

        // Si estamos editando, agregar el ID
        if (isEditing) {
            formData.append("id", idRef.current.value);
        }

        // Agregar imagen principal si existe
        if (imageRef.current.files[0]) {
            formData.append("image", imageRef.current.files[0]);
        }

        // Agregar características (filtrar vacías)
        const nonEmptyCharacteristics = characteristics
            .map((c) => c.value.trim())
            .filter((c) => c.length > 0);
        formData.append(
            "characteristics",
            JSON.stringify(nonEmptyCharacteristics)
        );
        // Agregar redes sociales (filtrar vacías)
        const nonEmptySocials = socials
            .filter((s) => s.social && s.link.trim())
            .map((s) => ({
                social: s.social,
                link: s.link.trim()
            }));
        console.log('=== SUBMIT - nonEmptySocials después del filtro:', nonEmptySocials);
        formData.append("socials", JSON.stringify(nonEmptySocials));

        // Enviar al backend
        const result = await staffRest.save(formData);
        if (!result) return;

        // Limpiar y cerrar
        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
        
        setCharacteristics([{ value: "" }]);
        setSocials([]);
        setSocialRefs([]);
    };

    // Resto de métodos (delete, boolean change, etc.)
    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar Staff",
            text: "¿Estás seguro de eliminar este staff?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await staffRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Staff"
                rest={staffRest}
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "refresh",
                            hint: "Refrescar tabla",
                            onClick: () =>
                                $(gridRef.current)
                                    .dxDataGrid("instance")
                                    .refresh(),
                        },
                    });
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "plus",
                            text: "Agregar",
                            hint: "Agregar nuevo staff",
                            onClick: () => onModalOpen(),
                        },
                    });
                }}
                columns={[
                    {
                        dataField: "id",
                        caption: "ID",
                        visible: false,
                    },
                    {
                        dataField: "job",
                        caption: "Puesto",
                        width: "200px",
                    },
                    {
                        dataField: "description",
                        caption: "Descripción",
                        cellTemplate: (container, { data }) => {
                            container.html(
                                renderToString(
                                    <div
                                        className="text-truncate"
                                        style={{ maxWidth: "300px" }}
                                    >
                                        {data.description}
                                    </div>
                                )
                            );
                        },
                    },
                    {
                        dataField: "characteristics",
                        caption: "Características",
                        cellTemplate: (container, { data }) => {
                            if (!data.characteristics) return;
                            container.html(
                                renderToString(
                                    <ul
                                        className="m-0 ps-3"
                                        style={{ listStyle: "none" }}
                                    >
                                        {data.characteristics
                                            .slice(0, 2)
                                            .map((char, i) => (
                                                <li
                                                    key={i}
                                                    className="text-truncate"
                                                    style={{
                                                        maxWidth: "250px",
                                                    }}
                                                >
                                                    <small>• {char}</small>
                                                </li>
                                            ))}
                                        {data.characteristics.length > 2 && (
                                            <li>
                                                <small className="text-muted">
                                                    +
                                                    {data.characteristics
                                                        .length - 2}{" "}
                                                    más...
                                                </small>
                                            </li>
                                        )}
                                    </ul>
                                )
                            );
                        },
                    },
                    {
                        dataField: "socials",
                        caption: "Redes sociales",
                        cellTemplate: (container, { data }) => {
                            if (!data.socials || data.socials.length === 0) {
                                container.html('<small class="text-muted">Sin redes</small>');
                                return;
                            }
                            
                            const socialsArray = Array.isArray(data.socials) ? data.socials : [];
                            const socialsToShow = socialsArray.slice(0, 3);
                            
                            ReactAppend(
                                container,
                                <div className="d-flex align-items-center">
                                    {socialsToShow.map((item, i) => {
                                        const social = predefinedSocials.find(s => s.id === item.social);
                                        if (!social) return null;
                                        const IconComponent = social.icon;
                                        return (
                                            <span key={i} className="me-2" title={social.name}>
                                                <IconComponent size={16} />
                                            </span>
                                        );
                                    })}
                                    {socialsArray.length > 3 && (
                                        <small className="text-muted">+{socialsArray.length - 3}</small>
                                    )}
                                </div>
                            );
                        },
                    },
                    {
                        dataField: "image",
                        caption: "Imagen",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/staff/media/${data.image}`}
                                    style={{
                                        width: "80px",
                                        height: "45px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                    onError={(e) =>
                                        (e.target.src =
                                            "/images/default-thumbnail.jpg")
                                    }
                                />
                            );
                        },
                    },
                    {
                        caption: "Acciones",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            container.append(
                                DxButton({
                                    className:
                                        "btn btn-xs btn-soft-primary me-1",
                                    title: "Editar",
                                    icon: "fa fa-pen",
                                    onClick: () => onModalOpen(data),
                                })
                            );
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-danger",
                                    title: "Eliminar",
                                    icon: "fa fa-trash",
                                    onClick: () => onDeleteClicked(data.id),
                                })
                            );
                        },
                    },
                ]}
            />

            <Modal
                modalRef={modalRef}
                title={isEditing ? "Editar Staff" : "Nuevo Staff"}
                onSubmit={onModalSubmit}
                size="lg"
            >
                <input ref={idRef} type="hidden" />

                <div className="row" id="staff-modal-container">
                    <div className="col-md-6">
                        <InputFormGroup
                            eRef={nameRef}
                            label="Nombres del staff"
                            required
                        />
                        <InputFormGroup
                            eRef={jobRef}
                            label="Puesto laboral"
                            required
                        />

                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea
                                ref={descriptionRef}
                                className="form-control"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Características
                            </label>
                            {characteristics.map((char, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: Egresada de la Universidad Nacional Federico Villarreal."
                                        value={char.value}
                                        onChange={(e) =>
                                            updateCharacteristic(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() =>
                                            removeCharacteristic(index)
                                        }
                                        disabled={characteristics.length <= 1}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={addCharacteristic}
                            >
                                <i className="fas fa-plus me-1"></i> Agregar
                                característica
                            </button>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <ImageFormGroup
                            eRef={imageRef}
                            label="Imagen principal"
                            aspect={1}
                        />
                        
                        <div className="mb-3">
                            <label className="form-label d-flex justify-content-between align-items-center">
                                <span>Redes sociales</span>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={addSocial}
                                >
                                    <i className="fas fa-plus me-1"></i> Agregar
                                </button>
                            </label>
                            
                            <div className="border rounded p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {socials.length === 0 ? (
                                    <div className="text-center text-muted py-4">
                                        <i className="fas fa-share-alt mb-2" style={{ fontSize: '2rem' }}></i>
                                        <p className="mb-0">No hay redes sociales agregadas</p>
                                        <p className="mb-0"><small>Haz clic en "Agregar" para añadir una red social</small></p>
                                    </div>
                                ) : (
                                    socials.map((social, index) => {
                                        if (!socialRefs[index]) {
                                            socialRefs[index] = React.createRef();
                                        }
                                        const selectedSocial = predefinedSocials.find(s => s.id === social.social);
                                        console.log(`Renderizando social ${index}:`, social, 'Link value:', social.link);
                                        
                                        return (
                                            <div key={index} className="mb-3 pb-3 border-bottom">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <small className="text-muted fw-bold">Red Social #{index + 1}</small>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => removeSocial(index)}
                                                        title="Eliminar red social"
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                                
                                                <SelectFormGroup
                                                    eRef={socialRefs[index]}
                                                    label="Tipo de red social"
                                                    dropdownParent="#staff-modal-container"
                                                    onChange={(e) => updateSocialType(index, e.target.value)}
                                                >
                                                    <option value="">Seleccionar red social...</option>
                                                    {predefinedSocials.map((s) => {
                                                        const IconComponent = s.icon;
                                                        return (
                                                            <option key={s.id} value={s.id}>
                                                                {s.name}
                                                            </option>
                                                        );
                                                    })}
                                                </SelectFormGroup>
                                                
                                                {selectedSocial && (
                                                    <div className="mb-2">
                                                        <div className="alert alert-info py-2 px-3 mb-0 d-flex align-items-center">
                                                            <selectedSocial.icon className="me-2" size={20} />
                                                            <small className="mb-0">
                                                                <strong>{selectedSocial.name}</strong> seleccionado
                                                            </small>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <div className="mt-2">
                                                    <label className="form-label mb-1">
                                                        <small>{selectedSocial?.id === 'email' ? 'Correo electrónico' : 'Enlace / URL'}</small>
                                                    </label>
                                                    <input
                                                        type={selectedSocial?.id === 'email' ? 'email' : 'text'}
                                                        className="form-control"
                                                        placeholder={
                                                            selectedSocial?.id === 'email' 
                                                                ? 'ejemplo@correo.com' 
                                                                : `https://${social.social || 'ejemplo'}.com/tu-usuario`
                                                        }
                                                        value={social.link || ''}
                                                        onChange={(e) => updateSocialLink(index, e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Staffs">
            <Staff {...properties} />
        </BaseAdminto>
    );
});
