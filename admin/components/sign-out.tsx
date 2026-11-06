export function SignOutButton() {
  return (
    <form action="/api/auth/signout" method="post">
      <button className="btn btn-ghost" style={{ padding: "7px 13px", fontSize: 13 }}>
        Sign out
      </button>
    </form>
  );
}
