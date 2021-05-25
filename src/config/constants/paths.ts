export interface Path {
  name: string;
  path: string;
}

const paths: Path[] = [
  { name: "Dashboard", path: "/" },
  { name: "Earn", path: "/earn" },
  { name: "Stake", path: "/stake" },
  { name: "Vote", path: "/vote" },
];

export default paths;
