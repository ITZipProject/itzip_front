import { useAtom } from 'jotai';

import { agreeAtom, allCheckedAtom, agreeErrorAtom } from '@/atoms/formAtoms';

const AgreeCheckboxes: React.FC = () => {
  const [isChecked, setIsChecked] = useAtom(agreeAtom);
  const [allChecked, setAllChecked] = useAtom(allCheckedAtom);
  const [, setAgreeError] = useAtom(agreeErrorAtom);

  const onChangeAllCheckbox = () => {
    const newCheckedStatus = !allChecked;
    setAllChecked(newCheckedStatus);
    setIsChecked({
      service: newCheckedStatus,
      private: newCheckedStatus,
    });
    setAgreeError(''); // 에러 메시지 초기화
  };

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setIsChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (!checked) {
      setAllChecked(false);
    } else {
      const newAllChecked = Object.values({
        ...isChecked,
        [name]: checked,
      }).every(Boolean);
      setAllChecked(newAllChecked);
    }
    setAgreeError(''); // 에러 메시지 초기화
  };

  return (
    <div className="*:p-spacing-04">
      <div>
        <input
          id="all"
          type="checkbox"
          checked={allChecked}
          onChange={onChangeAllCheckbox}
          className="size-spacing-05 border border-[##C6C6C6] outline-none ring-0"
        />
        <label htmlFor="all" className="ml-[9px] text-Grey-500">
          다음 약관에 모두 동의합니다.
        </label>
      </div>
      <div>
        <input
          id="service"
          type="checkbox"
          name="service"
          checked={isChecked.service}
          onChange={onChangeCheckbox}
          required
          className="size-spacing-05 border border-[##C6C6C6] outline-none ring-0"
        />
        <label htmlFor="service" className="ml-[9px] text-Grey-500">
          <span>(필수)</span>
          <span> ITZIP 이용약관</span>
          <span>에 동의합니다</span>
        </label>
      </div>
      <div>
        <input
          id="private"
          type="checkbox"
          name="private"
          checked={isChecked.private}
          onChange={onChangeCheckbox}
          required
          className="size-spacing-05 border border-[##C6C6C6] outline-none ring-0 "
        />
        <label htmlFor="private" className="ml-[9px] text-Grey-500">
          <span>(필수)</span>
          <span> 개인정보 수집 및 이용</span>
          <span>에 동의합니다</span>
        </label>
      </div>
    </div>
  );
};

export default AgreeCheckboxes;
