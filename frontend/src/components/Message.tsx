type Props = {
  message: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
};

function Message({ message, icon, actions, onClose }: Props) {
  return (
    <>
      <div className="m-modal">
        <div className="m-modal__bg">
          <div className="m-modal__cont">
            {onClose && (
              <div className="m-modal__close" onClick={onClose}>
                ×
              </div>
            )}
            <div className="m-modal__card">
              <p className="m-modal__ttl">{message}</p>
              {icon ? icon : null}
              {actions ? actions : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
