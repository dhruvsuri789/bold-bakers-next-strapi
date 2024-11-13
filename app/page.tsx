import Container from "./_components/Container";
import HeroHeading from "./_components/HeroHeading";
import Nav from "./_components/Nav";
import SectionsBuilder from "./_components/SectionsBuilder";

export default async function Home() {
  return (
    <Container>
      <Nav />
      <main>
        <HeroHeading />
        <SectionsBuilder />
      </main>
    </Container>
  );
}
