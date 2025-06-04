import Input from '../atoms/Input';
import Label from '../atoms/Label';

function HashtagInput({ value, onChange, placeholder }) {
  return (
    <div>
      <Label>Hashtags</Label>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 border border-neutral-300 rounded-xl"
      />
    </div>
  );
}

export default HashtagInput;