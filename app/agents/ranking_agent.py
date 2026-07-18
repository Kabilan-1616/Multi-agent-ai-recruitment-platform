from app.agents.base_agent import BaseAgent
from app.schemas.ranking_report import RankingReport

class RankingAgent(BaseAgent):
    def _execute(self, state):
        ranked =  sorted(
                state.match_report,
                key=lambda report : report.overall_score,
                reverse=True
            )
        
        state.ranking_report = RankingReport(
            ranked_candidates=ranked,
            total_candidates=len(ranked)
        )