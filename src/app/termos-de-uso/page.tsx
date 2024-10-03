import Header from '@/components/Header'
import { Box, Container, Stack, Text } from '@chakra-ui/react'
import { Fragment } from 'react'

export type TermsOfUsePageProps = object

export default async function TermsOfUsePage(props: TermsOfUsePageProps) {

    const { } = props

    return (
        <Fragment>
            <Header />
            <Box as='section' backgroundColor='#6B3FA0' minHeight='100vh' paddingTop='72px' width='full'>
                <Container maxWidth='container.md' paddingBottom={28} paddingTop={20}>
                    <Stack alignItems='center' spacing={0}>
                        <Text
                            as='h1'
                            color='#ffffff'
                            fontSize={['36px', '48px', '56px']}
                            fontWeight='700'>
                            Termos de uso
                        </Text>
                        <Text color='#ffffff' fontSize='16px' fontWeight='500' lineHeight='1.75' marginTop={20}>
                            Última atualização: 07 de setembro de 2024<br />
                            <br />
                            <b>1. Aceitação dos Termos</b><br />
                            Ao acessar e utilizar a nossa plataforma, você concorda em cumprir e ficar vinculado
                            aos seguintes Termos de Uso. Caso não concorde com qualquer parte destes termos,
                            você não deve utilizar a plataforma.<br />
                            <br />
                            <b>2. Descrição do Serviço</b><br />
                            Nossa plataforma permite que casais criem uma página personalizada preenchendo um
                            formulário com seu nome, data de início do relacionamento, uma mensagem personalizada
                            e até 7 fotos. Após o preenchimento, o casal é direcionado para o checkout e, ao concluir
                            o pagamento, recebe um link com um QR Code via email.<br />
                            <br />
                            <b>3. Cadastro e Segurança</b><br />
                            Para utilizar o serviço, você deve fornecer um endereço de email válido. Não compartilharemos
                            seu email com terceiros.<br />
                            <br />
                            <b>4. Privacidade</b><br />
                            Respeitamos a sua privacidade. Não utilizamos seus dados para qualquer tipo de processamento
                            ou venda de dados para terceiros. O email cadastrado é utilizado apenas para o envio do link
                            da página personalizada.<br />
                            <br />
                            <b>5. Conteúdo do Usuário</b><br />
                            Você é responsável pelo conteúdo que insere na plataforma, incluindo fotos, mensagens e
                            informações do relacionamento. Não nos responsabilizamos por qualquer conteúdo impróprio
                            ou ilegal carregado pelos usuários.<br />
                            <br />
                            <b>6. Pagamentos e Reembolsos</b><br />
                            Todos os pagamentos são processados através do Stripe. Após a conclusão do pagamento, o
                            casal receberá um link para a página personalizada via email. Não oferecemos reembolsos,
                            exceto em casos excepcionais a nosso exclusivo critério.<br />
                            <br />
                            <b>7. Modificações no Serviço</b><br />
                            Nós nos comprometemos a manter o serviço ativo e disponível pelo período contratado, conforme
                            o plano escolhido (1 ano no plano básico ou tempo vitalício no plano avançado). No entanto,
                            em circunstâncias excepcionais que fujam ao nosso controle, como questões legais, técnicas ou
                            financeiras, reservamo-nos o direito de modificar ou descontinuar o serviço. Caso seja necessário
                            descontinuar o serviço, tomaremos todas as medidas possíveis para notificar os usuários com
                            antecedência e garantir a preservação das páginas ou oferecer soluções alternativas sempre que
                            possível. A Loveyuu não se responsabiliza por eventuais perdas decorrentes de modificações ou
                            descontinuação em situações extraordinárias, mas faremos o possível para minimizar o impacto.<br />
                            <br />
                            <b>8. Limitação de Responsabilidade</b><br />
                            Em nenhuma circunstância seremos responsáveis por qualquer dano indireto, incidental, especial
                            ou consequente decorrente de ou relacionado ao uso ou incapacidade de uso da plataforma.<br />
                            <br />
                            <b>9. Alterações nos Termos</b><br />
                            Podemos atualizar estes Termos de Uso periodicamente. Quando fizermos isso, revisaremos
                            a data da {'"'}última atualização{'"'} no topo desta página. É sua responsabilidade revisar estes
                            Termos de Uso periodicamente para se manter informado sobre quaisquer alterações.<br />
                            <br />
                            <b>10. Contato</b><br />
                            Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco pelo
                            email: andreeliasdev@gmail.com
                        </Text>
                    </Stack>
                </Container>
            </Box>
        </Fragment>
    )
}