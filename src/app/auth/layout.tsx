interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <main className="flex flex-col w-full justify-center space-y-8 mt-11">
      <div className="flex flex-col items-center justify-center">
        {props.children}
      </div>
    </main>
  )
}