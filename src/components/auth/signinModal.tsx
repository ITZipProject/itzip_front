import Modal from './commonModal';
import Input from '../common/input';
import Button from '../common/button';

interface ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

const SignInModal: React.FC<ModalProps> = ({ isModalOpen, closeModal }) => {
    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="이메일로 로그인할까요?">
            <form action="" className="w-full px-[60px] space-y-4">
                <Input name="email" type="email" placeholder="이메일" required minLength={2} />
                <Input
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    required
                    minLength={2}
                />
                <div className="flex items-center my-[16px] justify-between">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name=""
                            className="size-[24px] rounded-[50%] border border-[#979797]"
                        />
                        <label className="ml-[9px] text-[#646464]">로그인 상태 유지</label>
                    </div>
                </div>
                <Button text="로그인" />
                <div className="flex flex-col items-center">
                    <h1 className="text-[12px] font-[400] text-[#818181]">또는</h1>
                    <h1 className="my-[16px] text-[#818181] hover:underline underline-offset-4">
                        비밀번호 찾기
                    </h1>
                </div>
            </form>
        </Modal>
    );
};
export default SignInModal;
