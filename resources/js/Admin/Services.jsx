import React, { useEffect, useRef, useState } from "react";
import BaseAdminto from "@Adminto/Base";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import Swal from "sweetalert2";
import ServicesRest from "../actions/Admin/ServicesRest";
import Modal from "../Components/Adminto/Modal";
import Table from "../Components/Adminto/Table";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import DxButton from "../Components/dx/DxButton";
import CreateReactScript from "../Utils/CreateReactScript";
import ReactAppend from "../Utils/ReactAppend";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import { LanguageProvider } from "../context/LanguageContext";
const servicesRest = new ServicesRest();

const Services = ({ brands }) => {
    const [itemData, setItemData] = useState([]);
    const gridRef = useRef();
    const modalRef = useRef();

    // Refs para campos del formulario
    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const benefitsRef = useRef();
    const imageRef = useRef();
    const iconRef = useRef();
    //const colorRef = useRef();
    //const linkRef = useRef();
    // Estados para galería y características
    const [gallery, setGallery] = useState([]);
    //const galleryRef = useRef();
    const [characteristics, setCharacteristics] = useState([{ value: "" }]);
    const [isEditing, setIsEditing] = useState(false);

    // Habilitar Drag and Drop en la tabla
    useEffect(() => {
        const checkInterval = setInterval(() => {
            if (gridRef.current && $(gridRef.current).dxDataGrid("instance")) {
                clearInterval(checkInterval);
                const grid = $(gridRef.current).dxDataGrid("instance");

                grid.option("rowDragging", {
                    allowReordering: true,
                    showDragIcons: true,
                    onReorder: async (e) => {
                        const visibleRows = e.component.getVisibleRows();
                        const toIndex = e.toIndex;
                        const fromIndex = e.fromIndex;

                        const newRows = [...visibleRows];
                        const movedItem = newRows.splice(fromIndex, 1)[0];
                        newRows.splice(toIndex, 0, movedItem);

                        const pageIndex = e.component.pageIndex();
                        const pageSize = e.component.pageSize();
                        const startOrder = pageIndex * pageSize;

                        const newOrderItems = newRows.map((row, index) => ({
                            id: row.data.id,
                            order: startOrder + index
                        }));

                        await servicesRest.reorder(newOrderItems);
                        e.component.refresh();
                    },
                });
            }
        }, 100);
        return () => clearInterval(checkInterval);
    }, []);

    // Manejo de la galería
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            isNew: true,
        }));
        setGallery((prev) => [...prev, ...newImages]);
    };

    const removeGalleryImage = (index) => {
        setGallery((prev) => prev.filter((_, i) => i !== index));
    };

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

    // Cargar datos al editar
    const onModalOpen = (data) => {
        setItemData(data || null);
        setIsEditing(!!data?.id);

        // Resetear formulario
        idRef.current.value = data?.id || "";
        titleRef.current.value = data?.title || "";
        descriptionRef.current.value = data?.description || "";
        benefitsRef.current.value = data?.benefits || "";
        imageRef.current.value = null;
        iconRef.current.value = null;

        // Manejo del color (transparente o con valor)
        const hasColor = data?.color && data.color !== "transparent" && data.color !== "";
        setItemData({
            ...data,
            transparent_color: !hasColor,
            color: hasColor ? data?.color : "transparent"
        });

        /* if (hasColor) {
             colorRef.current.value = data?.color;
         } else {
             colorRef.current.value = "#000000";
             colorRef.current.dataset.prevColor = "#000000";
         } */

        if (data?.image) {
            imageRef.image.src = `/api/service/media/${data.image}`;
        }

        if (data?.icon) {
            iconRef.image.src = `/api/service/media/${data.icon}`;
        }

        // Cargar galería existente
        if (data?.gallery) {
            console.log(data?.gallery);
            const existingImages = data.gallery.map((url) => ({
                url: `/api/service/media/${url}`,
                isNew: false,
            }));

            setGallery(existingImages);
        } else {
            setGallery([]);
        }

        // Cargar características existentes
        if (data?.characteristics && data.characteristics.length > 0) {
            setCharacteristics(
                data.characteristics.map((item) => ({ value: item }))
            );
        } else {
            setCharacteristics([{ value: "" }]);
        }
        //  linkRef.current.value = data?.link ?? "";
        $(modalRef.current).modal("show");
    };

    // Enviar formulario
    const onModalSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("benefits", benefitsRef.current.value);

        // Si el color es transparente, enviar valor especial, de lo contrario enviar el color seleccionado
        //formData.append("color", itemData?.transparent_color ? "transparent" : colorRef.current.value);
        // formData.append("link", linkRef.current.value);

        // Si estamos editando, agregar el ID
        if (isEditing) {
            formData.append("id", idRef.current.value);
        }

        // Agregar imagen principal si existe
        if (imageRef.current.files[0]) {
            formData.append("image", imageRef.current.files[0]);
        }

        // Agregar icono si existe
        if (iconRef.current.files[0]) {
            formData.append("icon", iconRef.current.files[0]);
        }

        // Agregar imágenes de galería nuevas
        gallery
            .filter((img) => img.isNew)
            .forEach((img, index) => {
                formData.append(`gallery[${index}]`, img.file);
            });

        // Agregar IDs de imágenes existentes
        const existingGallery = gallery
            .filter((img) => !img.isNew)
            .map((img) => {
                return img.url.split("/").pop();
            });
        formData.append("existing_gallery", JSON.stringify(existingGallery));

        // Agregar características (filtrar vacías)
        const nonEmptyCharacteristics = characteristics
            .map((c) => c.value.trim())
            .filter((c) => c.length > 0);
        formData.append(
            "characteristics",
            JSON.stringify(nonEmptyCharacteristics)
        );

        // Enviar al backend
        const result = await servicesRest.save(formData);
        if (!result) return;

        // Limpiar y cerrar
        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
        setGallery([]);
        setCharacteristics([{ value: "" }]);

        // Resetear campos adicionales
        // colorRef.current.value = "#000000";
        iconRef.current.value = null;
    };

    // Resto de métodos (delete, boolean change, etc.)
    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Delete Service",
            text: "Are you sure you want to delete this service?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
        });
        if (!isConfirmed) return;
        const result = await servicesRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await servicesRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onFeaturedChange = async ({ id, value }) => {
        const result = await servicesRest.boolean({
            id,
            field: "featured",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };
    return (
        <>
            <Table
                gridRef={gridRef}
                title="Services"
                rest={servicesRest}
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "refresh",
                            hint: "Refresh table",
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
                            text: "Add",
                            hint: "Add new service",
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
                        dataField: "title",
                        caption: "Title",
                        width: "200px",
                    },
                    {
                        dataField: "description",
                        caption: "Description",
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
                        dataField: "image",
                        caption: "Image",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            if (data.image) {
                                ReactAppend(
                                    container,
                                    <img
                                        src={`/api/service/media/${data.image}`}
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
                            } else {
                                container.html('<span class="text-muted">No image</span>');
                            }
                        },
                    },
                    {
                        dataField: "icon",
                        caption: "Icon",
                        width: "80px",
                        cellTemplate: (container, { data }) => {
                            if (data.icon) {
                                ReactAppend(
                                    container,
                                    <img
                                        src={`/api/service/media/${data.icon}`}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            objectFit: "cover",
                                            borderRadius: "4px",
                                        }}
                                        onError={(e) =>
                                        (e.target.src =
                                            "/images/default-icon.png")
                                        }
                                        className="bg-secondary p-1"
                                    />
                                );
                            } else {
                                container.html('<span class="text-muted">No icon</span>');
                            }
                        },
                    },
                    /*   {
                           dataField: "color",
                           caption: "Color",
                           width: "80px",
                           cellTemplate: (container, { data }) => {
                               const isTransparent = !data.color || data.color === "transparent" || data.color === "";
                               
                               ReactAppend(
                                   container,
                                   <div className="d-flex align-items-center">
                                       {isTransparent ? (
                                           <div
                                               style={{
                                                   width: "30px",
                                                   height: "20px",
                                                   borderRadius: "3px",
                                                   border: "1px solid #ddd",
                                                   marginRight: "5px",
                                                   backgroundImage: "linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 50%, #f0f0f0 50%, #f0f0f0 75%, transparent 75%, transparent)",
                                                   backgroundSize: "8px 8px"
                                               }}
                                           ></div>
                                       ) : (
                                           <div
                                               style={{
                                                   width: "30px",
                                                   height: "20px",
                                                   backgroundColor: data.color,
                                                   borderRadius: "3px",
                                                   border: "1px solid #ddd",
                                                   marginRight: "5px"
                                               }}
                                           ></div>
                                       )}
                                       <small>{isTransparent ? "Transparente" : data.color}</small>
                                   </div>
                               );
                           },
                       },
                       {
                           dataField: "featured",
                           caption: "Destacado",
                           dataType: "boolean",
                           cellTemplate: (container, { data }) => {
                               $(container).empty();
                               ReactAppend(
                                   container,
                                   <SwitchFormGroup
                                       checked={data.featured == 1}
                                       onChange={() =>
                                           onFeaturedChange({
                                               id: data.id,
                                               value: !data.featured,
                                           })
                                       }
                                   />
                               );
                           },
                       }, */
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        cellTemplate: (container, { data }) => {
                            $(container).empty();
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.visible == 1}
                                    onChange={() =>
                                        onVisibleChange({
                                            id: data.id,
                                            value: !data.visible,
                                        })
                                    }
                                />
                            );
                        },
                    },

                    {
                        caption: "Actions",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            container.append(
                                DxButton({
                                    className:
                                        "btn btn-xs btn-soft-primary me-1",
                                    title: "Edit",
                                    icon: "fa fa-pen",
                                    onClick: () => onModalOpen(data),
                                })
                            );
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-danger",
                                    title: "Delete",
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
                title={isEditing ? "Edit Service" : "New Service"}
                onSubmit={onModalSubmit}
                size="lg"
            >
                <input ref={idRef} type="hidden" />

                <div className="row">
                    <div className="col-md-6">
                        <InputFormGroup
                            eRef={titleRef}
                            label="Service Title"
                            required
                        />

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                ref={descriptionRef}
                                className="form-control"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Benefits / Why choose this service</label>
                            <textarea
                                ref={benefitsRef}
                                className="form-control"
                                rows={4}
                                placeholder="Describe the benefits and advantages of this service..."
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Characteristics / Features
                            </label>
                            {characteristics.map((char, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: Technical Troubleshooting"
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
                                <i className="fas fa-plus me-1"></i> Add
                                characteristic
                            </button>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <ImageFormGroup
                            eRef={imageRef}
                            label="Main Image"
                            aspect={16 / 9}
                        />

                        <ImageFormGroup
                            eRef={iconRef}
                            label="Service Icon"
                            aspect={1 / 1}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <LanguageProvider>
            <BaseAdminto {...properties} title="Services">
                <Services {...properties} />
            </BaseAdminto>
        </LanguageProvider>
    );
});
