import RichTextBlock from './RichTextBlock';
import CalloutBlock from './CalloutBlock';
import StatRowBlock from './StatRowBlock';
import ComparisonTableBlock from './ComparisonTableBlock';
import TestimonialBlock from './TestimonialBlock';
import CalculatorBlock from './CalculatorBlock';
import ProofCtaBlock from './ProofCtaBlock';
import HardCtaBlock from './HardCtaBlock';
import FaqBlock from './FaqBlock';
import ChecklistBlock from './ChecklistBlock';
import ProofImageBlock from './ProofImageBlock';

interface Block {
  __component: string;
  id: number;
  [key: string]: any;
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks?.length) return null;

  return (
    <div className="content">
      {blocks.map((block) => {
        const key = `${block.__component}-${block.id}`;
        switch (block.__component) {
          case 'blocks.rich-text':
            return <RichTextBlock key={key} content={block.content} />;
          case 'blocks.proof-image':
            return <ProofImageBlock key={key} image={block.image} caption={block.caption} size={block.size} />;
          case 'blocks.callout':
            return <CalloutBlock key={key} type={block.type} content={block.content} />;
          case 'blocks.stat-row':
            return <StatRowBlock key={key} stats={block.stats} />;
          case 'blocks.comparison-table':
            return <ComparisonTableBlock key={key} tableData={block.tableData} />;
          case 'blocks.testimonial-ref':
            return <TestimonialBlock key={key} testimonial={block.testimonial} quote={block.quote} customerName={block.customerName} detail={block.detail} />;
          case 'blocks.cta-calculator':
            return <CalculatorBlock key={key} heading={block.heading} description={block.description} placeholder={block.placeholder} />;
          case 'blocks.cta-proof':
            return <ProofCtaBlock key={key} stats={block.stats} description={block.description} primaryButton={block.primaryButton} secondaryButton={block.secondaryButton} />;
          case 'blocks.cta-hard':
            return <HardCtaBlock key={key} heading={block.heading} description={block.description} primaryButton={block.primaryButton} secondaryButton={block.secondaryButton} phoneNumber={block.phoneNumber} />;
          case 'blocks.faq-section':
            return <FaqBlock key={key} heading={block.heading} questions={block.questions} />;
          case 'blocks.checklist':
            return <ChecklistBlock key={key} heading={block.heading} items={block.items} />;
          default:
            if (process.env.NODE_ENV === 'development') {
              return <div key={key} style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '13px', color: '#991b1b', margin: '12px 0' }}>Unknown block: {block.__component}</div>;
            }
            return null;
        }
      })}
    </div>
  );
}
