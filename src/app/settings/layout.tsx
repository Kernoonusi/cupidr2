import { auth } from '@/auth';

const SettingsLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <div className="w-full flex-grow flex items-center justify-center">
      {children}
    </div>
  );
};

export default SettingsLayout;
