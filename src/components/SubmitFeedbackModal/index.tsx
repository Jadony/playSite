import { FC, useEffect, useRef, useState } from "react";
import CommonModal from "../CommonModal";
import { Image, message, Upload } from "antd";
import { Plus } from "lucide-react";
import PrimaryButton from "../PrimaryButton";
import "./style.css";
import { FeedbackType } from "@/config";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useTranslation } from "react-i18next";
import { feedbackSubmit } from "@/api/user";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type SubmitFeedbackModalProps = {
  visible: boolean;
  onClose: () => void;
  type: string;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const SubmitFeedbackModal: FC<SubmitFeedbackModalProps> = ({
  type,
  visible,
  onClose,
}) => {
  const [showType, setShowType] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [userTel, setUserTel] = useState("");
  const [feedbackType, setFeedbackType] = useState(type);
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("token");
  const { t } = useTranslation();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setImageList(newFileList);
  };
  function handleClickOutside(event: MouseEvent) {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setShowType(false);
    }
  }

  const handleSubmitFeedback = async () => {
    setLoading(true);
    try {
      const { data } = await feedbackSubmit({
        type: feedbackType,
        content: feedbackContent,
        contact: userTel,
        images: imageList.map((file) => file.response.data),
      });
      if (data.data) {
        setFeedbackType("");
        setFeedbackContent("");
        setImageList([]);
        setUserTel("");
        onClose();
      }
    } catch (error) {
      setLoading(false);
      message.error("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setFeedbackType(type);
  }, [type]);
  const modalContent = (
    <div>
      <div className="my-5 relative" ref={selectRef}>
        <div className="text-sm text-white pb-4">{t("feedback.category")}</div>
        <div
          className="flex bg-white/5 px-5 py-3 w-full h-[54px] items-center justify-between glass-gradient-border rounded-3xl"
          onClick={() => setShowType(!showType)}
        >
          <div>{feedbackType}</div>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`stroke-current opacity-50 transition-transform duration-300 ${showType ? "rotate-180" : ""}`}
          >
            <path
              d="M1 1L5 5L9 1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {showType && (
          <div className="absolute top-[90px] left-0 w-full mt-1 bg-[#353535] rounded-lg shadow-xl z-20 overflow-hidden">
            {Object.entries(FeedbackType(t)).map(([key, value]) => (
              <div
                key={key}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                onClick={() => {
                  setFeedbackType(value);
                  setShowType(false);
                }}
              >
                {value}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="my-5 relative textarea-wrap">
        <div className="text-sm text-white pb-4">{t("feedback.content")}</div>
        <div className="w-full h-[385px] rounded-2xl glass-gradient-border glass-gradient-border-textarea-wrap">
          <textarea
            onChange={(e) => setFeedbackContent(e.target.value)}
            className="w-full h-full rounded-2xl p-5 bg-transparent resize-none outline-none"
            placeholder={t("feedback.enterFeedbackDetails")}
            maxLength={200}
            value={feedbackContent}
          />
        </div>
        <div className="textarea-number absolute bottom-5 right-5 text-white/50 text-xs">
          {feedbackContent.length}/200
        </div>
        <div className="absolute bottom-5 left-5">
          <Upload
            accept=".png,.jpg,.jpeg,.webp"
            action="/front/oss/upload"
            listType="picture-card"
            maxCount={3}
            itemRender={(originNode, _file, _currFileList, actions) => {
              // 检查文件是否正在上传
              if (_file?.status === "uploading") {
                return (
                  <div className="relative group cursor-pointer w-full h-full">
                    {/* 自定义上传中状态 - 不渲染 originNode */}
                    <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                      <div className="text-white text-xs">
                        {t("feedback.uploading")}
                      </div>
                    </div>
                  </div>
                );
              }

              // 其他状态（上传成功、失败等）
              return (
                <div className="relative group cursor-pointer">
                  {/* 使用 originNode 来渲染图片本身 */}
                  {originNode}
                  {/* 自定义删除按钮 */}
                  <div
                    className="absolute top-[-10px] right-[-10px] rounded-full p-1 cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      actions.remove();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <rect width="20" height="20" rx="10" fill="white" />
                      <path
                        d="M6.99951 12.9998L12.9995 6.99976"
                        stroke="black"
                        strokeWidth="1.45582"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.99951 6.99976L12.9995 12.9998"
                        stroke="black"
                        strokeWidth="1.45582"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              );
            }}
            showUploadList={{
              showRemoveIcon: false, // 隐藏删除按钮
            }}
            onPreview={handlePreview}
            onChange={handleChange}
            headers={{
              authorization: token || "",
            }}
            fileList={imageList}
          >
            {imageList.length < 3 && <Plus className="opacity-50" />}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </div>
      </div>
      <div className="my-5">
        <div className="text-sm text-white pb-4">
          {t("feedback.contactInfo")}
        </div>
        <div className="w-full h-[54px] bg-white/5 rounded-3xl glass-gradient-border">
          <input
            onChange={(e) => setUserTel(e.target.value)}
            className="w-full h-full rounded-3xl bg-transparent px-5 outline-none"
            type="text"
            placeholder={t("feedback.enterYourContactInfo")}
            value={userTel}
          />
        </div>
      </div>
      <PrimaryButton
        disabled={loading}
        fullWidth
        onClick={handleSubmitFeedback}
      >
        <div className="text-base">{t("feedback.submitFeedback")}</div>
      </PrimaryButton>
    </div>
  );

  return (
    <CommonModal
      maskClosable={false}
      width={461}
      title={<span className="text-lg">{t("feedback.submitFeedback")}</span>}
      content={modalContent}
      visible={visible}
      onClose={onClose}
      footer={null}
    />
  );
};

export default SubmitFeedbackModal;
