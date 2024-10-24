'use client';

import Layout from '../../components/layout/Layout';
import AbsenceList from '../../components/absences_conges/CongesList';

export default function Absences() {
  return (
    <Layout>
      <h1>Congés</h1>
      <AbsenceList />
    </Layout>
  );
}
