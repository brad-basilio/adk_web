import React, { useRef, useState } from "react";
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
import TestimoniesRest from "../Actions/Admin/TestimoniesRest";
import Swal from "sweetalert2";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";

const testimoniesRest = new TestimoniesRest();

const Testimonies = ({}) => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const caseRef = useRef();
    //const correlativeRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const [isEditing, setIsEditing] = useState(false);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);
        console.log(data);
        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        caseRef.current.value = data?.case ?? "";
        //correlativeRef.current.value = data?.correlative ?? "";
        descriptionRef.current.value = data?.description ?? "";
        imageRef.image.src = `/api/testimony/media/${data?.image}`;
        imageRef.current.value = null;

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current.value || undefined,
            name: nameRef.current.value,
            case: caseRef.current.value,
           correlative: caseRef.current.value,//correlativeRef.current.value,
            description: descriptionRef.current.value,
        };
        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }
        const file = imageRef.current.files[0];
        if (file) {
            formData.append("image", file);
        }

        const result = await testimoniesRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await testimoniesRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Delete testimonial",
            text: "Are you sure you want to delete this testimonial?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
        });
        if (!isConfirmed) return;
        const result = await testimoniesRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Testimonials"
                rest={testimoniesRest}
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
                            text: "New testimonial",
                            hint: "New testimonial",
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
                        caption: "Author",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <p className="mb-0" style={{ width: "100%" }}>
                                    <b className="d-block">{data.name}</b>
                                    <small className="text-nowrap text-muted truncate">
                                        {data.case}
                                    </small>
                                </p>
                            );
                        },
                    },
                    {
                        dataField: "description",
                        caption: "Description",
                        width: "50%",
                    },
                    {
                        dataField: "image",
                        caption: "Image",
                        width: "60px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/testimony/media/${data.image}`}
                                    style={{
                                        width: "50px",
                                        aspectRatio: 1,
                                        objectFit: "contain",
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
                    {
                        caption: "Actions",
                        cellTemplate: (container, { data }) => {
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
                title={isEditing ? "Edit testimonial" : "Add testimonial"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="testimony-container">
                    <input ref={idRef} type="hidden" />
                    <ImageFormGroup
                        eRef={imageRef}
                        label="Image"
                        col="col-md-4"
                        aspect={1}
                        fit="contain"
                        required
                    />

                    <div className="col-md-8">
                        <InputFormGroup
                            eRef={nameRef}
                            label="Name"
                            required
                        />
                        {/*<InputFormGroup
                            eRef={correlativeRef}
                            label="Location"
                            required
                        /> */}
                          <InputFormGroup
                            eRef={caseRef}
                            label="Case"
                            required
                        />
                    </div>
                    <TextareaFormGroup
                        type="text"
                        eRef={descriptionRef}
                        label="Description"
                        rows={3}
                        placeholder="Enter the testimonial text"
                        required
                        col="col-12"
                    />
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Testimonials">
            <Testimonies {...properties} />
        </BaseAdminto>
    );
});
