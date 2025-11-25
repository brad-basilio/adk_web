import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Table from "../Components/Table";
import Modal from "../Components/Modal";
import InputFormGroup from "../Components/form/InputFormGroup";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../Components/dx/DxButton";
import TextareaFormGroup from "@Adminto/form/TextareaFormGroup";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import SlidersRest from "../actions/Admin/SlidersRest";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import Swal from "sweetalert2";
import VideoFormGroup from "../components/Adminto/form/VideoFormGroup";

const slidersRest = new SlidersRest();

const Sliders = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const tagRef = useRef();
    const descriptionRef = useRef();
    const bgImageRef = useRef();

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

                        await slidersRest.reorder(newOrderItems);
                        e.component.refresh();
                    },
                });
            }
        }, 100);
        return () => clearInterval(checkInterval);
    }, []);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        tagRef.current.value = data?.tag ?? "";
        descriptionRef.current.value = data?.description ?? "";
        // Configurar imagen existente si estamos editando
        bgImageRef.image.src = `/api/sliders/media/${data?.image ?? "undefined"}`;

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current.value || undefined,
            name: nameRef.current.value,
            tag: tagRef.current.value,
            description: descriptionRef.current.value,
            button_text: "",
            button_link: "",
        };

        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }

        // Obtener el archivo de imagen
        const image = bgImageRef.current.files[0];
        if (image) {
            formData.append("image", image);
        }

        const result = await slidersRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await slidersRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Delete slider",
            text: "Are you sure you want to delete this slider?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
        });
        if (!isConfirmed) return;
        const result = await slidersRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Sliders"
                rest={slidersRest}
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
                            text: "New slider",
                            hint: "New slider",
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
                        dataField: "name",
                        caption: "Title",
                        width: "75%",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                data.name || data.description ? (
                                    <p
                                        className="mb-0"
                                        style={{ width: "100%" }}
                                    >
                                        <b className="d-block">{data.name}</b>
                                        <small
                                            className="text-wrap text-muted"
                                            style={{
                                                overflow: "hidden",
                                                display: "-webkit-box",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: 2,
                                            }}
                                        >
                                            {data.description}
                                        </small>
                                    </p>
                                ) : (
                                    <i className="text-muted">
                                        - No text content -
                                    </i>
                                )
                            );
                        },
                    },
                    {
                        dataField: "image",
                        caption: "Image",
                        width: "90px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/sliders/media/${data.image}`}
                                    style={{
                                        width: "80px",
                                        height: "48px",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        borderRadius: "4px",
                                    }}
                                    onError={(e) =>
                                    (e.target.src =
                                        "/api/cover/thumbnail/null")
                                    }
                                />
                            );
                        },
                    },
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
                    // {
                    //   dataField: 'status',
                    //   caption: 'Estado',
                    //   dataType: 'boolean',
                    //   cellTemplate: (container, { data }) => {
                    //     switch (data.status) {
                    //       case 1:
                    //         ReactAppend(container, <span className='badge bg-success rounded-pill'>Activo</span>)
                    //         break
                    //       case 0:
                    //         ReactAppend(container, <span className='badge bg-danger rounded-pill'>Inactivo</span>)
                    //         break
                    //       default:
                    //         ReactAppend(container, <span className='badge bg-dark rounded-pill'>Eliminado</span>)
                    //         break
                    //     }
                    //   }
                    // },
                    {
                        caption: "Actions",
                        cellTemplate: (container, { data }) => {
                            container.css("text-overflow", "unset");
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-primary",
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
                        allowFiltering: false,
                        allowExporting: false,
                    },
                ]}
            />
            <Modal
                modalRef={modalRef}
                title={isEditing ? "Edit slider" : "Add slider"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="sliders-container">
                    <input ref={idRef} type="hidden" />
                    <ImageFormGroup
                        eRef={bgImageRef}
                        label="Select an image"
                        col="col-12"
                        required
                    />

                    <TextareaFormGroup
                        eRef={nameRef}
                        label="Title (use *word* to highlight)"
                        col="col-12"
                        rows={2}
                        required
                    />
                    <InputFormGroup
                        eRef={tagRef}
                        label="Top label (TAG)"
                        col="col-sm-12"
                        placeholder="INNOVATIVE TECHNOLOGY SOLUTIONS"
                    />
                    <TextareaFormGroup
                        eRef={descriptionRef}
                        label="Description"
                        col="col-12"
                        rows={3}
                    />
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Sliders">
            <Sliders {...properties} />
        </BaseAdminto>
    );
});
