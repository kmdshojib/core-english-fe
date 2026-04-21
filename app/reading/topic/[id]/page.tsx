type TopicPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const TopicPage = async ({ params }: TopicPageProps) => {
  const { id } = await params;

  return <div>TopicPage {id}</div>;
};

export default TopicPage;
